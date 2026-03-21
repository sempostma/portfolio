import * as d3 from 'd3';
import { legendColor, legendSize } from 'd3-svg-legend';

// Type declarations for d3-svg-legend (no official types available)
declare module 'd3-svg-legend' {
  export function legendColor(): LegendColor;
  export function legendSize(): LegendSize;

  interface LegendColor {
    scale(scale: d3.ScaleOrdinal<string, string>): this;
    shape(shape: string): this;
    (selection: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>): void;
  }

  interface LegendSize {
    scale(scale: d3.ScaleOrdinal<string, number>): this;
    shape(shape: string): this;
    shapePadding(padding: number): this;
    labelAlign(align: string): this;
    (selection: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>): void;
  }
}

// Technology data interface
export interface TechData {
  cat: string;
  name: string;
  value: number;
  icon: string;
  desc: string;
}

// Node interface for the bubble chart
interface BubbleNode {
  x: number;
  y: number;
  r: number;
  radius: number;
  id: string;
  cat: string;
  name: string;
  value: number;
  icon: string;
  desc: string;
  fx: number | null;
  fy: number | null;
  index?: number;
}

// Store the current simulation so we can stop it on re-init
let currentSimulation: d3.Simulation<BubbleNode, undefined> | null = null;

// Extended color scheme to replace the removed schemeCategory20
const extendedColorScheme = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5',
  '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5'
];

const d3Data = d3.json<TechData[]>('./technologies.json').then((data) => data?.map(d => ({
  ...d,
  icon: '/images/techs/' + d.icon,
})));

export function initD3TechStackBubble(onReady: (runAnimation: () => void) => void): void {
  d3Data.then((data) => {
    if (data) {
      initD3TechStackBubbleWithData(data, onReady);
    }
  });
}

export function initD3TechStackBubbleWithData(data: TechData[], onReady: (runAnimation: () => void) => void): void {
  const element = document.getElementById('teck-stack-svg');
  if (element === null) return;

  // Stop any existing simulation
  if (currentSimulation) {
    currentSimulation.stop();
    currentSimulation = null;
  }

  // Remove any existing document click handler from previous initialization
  d3.select(document).on('click.d3bubble', null);

  const svg = d3.select<SVGSVGElement, unknown>('#teck-stack-svg');

  // Clear any existing content
  svg.selectAll('*').remove();

  const width = (svg.node() as SVGSVGElement).clientWidth;
  let height: number;
  const heightAttr = svg.attr('height');
  if (heightAttr && heightAttr.endsWith('%')) {
    height = Math.round((element.parentElement?.offsetHeight || 0) * parseFloat(heightAttr) * 0.01);
  } else {
    height = parseFloat(heightAttr) || 0;
  }

  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const strength = 0.05;
  let focusedNode: BubbleNode | null = null;

  const scaleColor = d3.scaleOrdinal<string, string>(extendedColorScheme);

  // Use pack to calculate radius of the circle
  const pack = d3.pack<{ children: TechData[] }>()
    .size([width, height])
    .padding(1.5);

  let forceCollide: d3.ForceCollide<BubbleNode>;
  let simulation: d3.Simulation<BubbleNode, undefined>;

  const root = d3.hierarchy<{ children: TechData[] }>({ children: data })
    .sum((d) => (d as unknown as TechData).value || 0);

  // We use pack() to automatically calculate radius conveniently only
  // and get only the leaves
  const nodes: BubbleNode[] = pack(root).leaves().map((node) => {
    const nodeData = node.data as unknown as TechData;
    return {
      x: centerX + (node.x - centerX) * 3,
      y: centerY + (node.y - centerY) * 3,
      r: 0,
      radius: node.r,
      id: nodeData.cat + '.' + nodeData.name.replace(/\s/g, '-'),
      cat: nodeData.cat,
      name: nodeData.name,
      value: nodeData.value,
      icon: nodeData.icon,
      desc: nodeData.desc,
      fx: null,
      fy: null,
    };
  });

  const node = svg.selectAll<SVGGElement, BubbleNode>('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .call(
      d3.drag<SVGGElement, BubbleNode>()
        .on('start', (event: d3.D3DragEvent<SVGGElement, BubbleNode, BubbleNode>, d: BubbleNode) => {
          if (!event.active) simulation.alphaTarget(0.2).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: d3.D3DragEvent<SVGGElement, BubbleNode, BubbleNode>, d: BubbleNode) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event: d3.D3DragEvent<SVGGElement, BubbleNode, BubbleNode>, d: BubbleNode) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  node.append('circle')
    .attr('id', (d) => d.id)
    .attr('r', 0)
    .style('fill', (d) => scaleColor(d.cat))
    .transition()
    .duration(2000)
    .ease(d3.easeElasticOut)
    .tween('circleIn', function(d) {
      const i = d3.interpolateNumber(0, d.radius);
      return (t: number) => {
        d.r = i(t);
        if (!simulation) return;
        simulation.force('collide', forceCollide);
      };
    })
    .on('interrupt', function(d) {
      d.r = d.radius;
    });

  node.append('clipPath')
    .attr('id', (d) => `clip-${d.id}`)
    .append('use')
    .attr('xlink:href', (d) => `#${d.id}`);

  // Display text as circle icon
  node.filter((d) => !d.icon)
    .append('text')
    .classed('node-icon', true)
    .attr('clip-path', (d) => `url(#clip-${d.id})`)
    .selectAll('tspan')
    .data((d) => d.icon.split(';'))
    .enter()
    .append('tspan')
    .attr('x', 0)
    .attr('y', (_d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
    .text((name) => name);

  // Display image as circle icon
  node.filter((d) => !!d.icon)
    .append('image')
    .classed('node-icon', true)
    .attr('clip-path', (d) => `url(#clip-${d.id})`)
    .attr('xlink:href', (d) => d.icon)
    .attr('x', (d) => -d.radius * 0.7)
    .attr('y', (d) => -d.radius * 0.7)
    .attr('height', (d) => d.radius * 2 * 0.7)
    .attr('width', (d) => d.radius * 2 * 0.7);

  node.append('title')
    .text((d) => d.desc);

  const legendOrdinalScale = legendColor()
    .scale(scaleColor)
    .shape('circle');

  // Legend 1
  svg.append('g')
    .classed('legend-color', true)
    .attr('text-anchor', 'start')
    .attr('transform', 'translate(20,30)')
    .style('font-size', '12px')
    .call(legendOrdinalScale as unknown as (selection: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>) => void);

  const sizeScale = d3.scaleOrdinal<string, number>()
    .domain(['less skilled', 'more skilled'])
    .range([5, 10]);

  const legendSizeScale = legendSize()
    .scale(sizeScale)
    .shape('circle')
    .shapePadding(10)
    .labelAlign('end');

  // Legend 2
  svg.append('g')
    .classed('legend-size', true)
    .attr('text-anchor', 'start')
    .attr('transform', 'translate(150, 25)')
    .style('font-size', '12px')
    .call(legendSizeScale as unknown as (selection: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>) => void);

  // Info box overlay
  const infoBox = node.append('foreignObject')
    .classed('circle-overlay hidden', true)
    .attr('x', -350 * 0.5 * 0.8)
    .attr('y', -350 * 0.5 * 0.8)
    .attr('height', 350 * 0.8)
    .attr('width', 350 * 0.8)
    .append('xhtml:div')
    .classed('circle-overlay__inner', true);

  infoBox.append('i');

  infoBox.append('h2')
    .classed('circle-overlay__title', true)
    .classed('text-primary', true)
    .text((d) => d.name);

  infoBox.append('p')
    .classed('circle-overlay__body', true)
    .html((d) => d.desc);

  node.on('click', function(event: MouseEvent, currentNode: BubbleNode) {
    event.stopPropagation();
    console.log('currentNode', currentNode);
    const currentTarget = this;

    if (currentNode === focusedNode) {
      return;
    }

    const lastNode = focusedNode;
    focusedNode = currentNode;

    simulation.alphaTarget(0.2).restart();

    // Hide all circle-overlay
    d3.selectAll('.circle-overlay').classed('hidden', true);
    d3.selectAll('.node-icon').classed('node-icon--faded', false);

    // Don't fix last node to center anymore
    if (lastNode) {
      lastNode.fx = null;
      lastNode.fy = null;
      node.filter((_d, i) => i === lastNode.index)
        .transition()
        .duration(2000)
        .ease(d3.easePolyOut)
        .tween('circleOut', function() {
          const startR = lastNode.r;
          const irl = d3.interpolateNumber(startR, lastNode.radius);
          return (t: number) => {
            lastNode.r = irl(t);
          };
        })
        .on('interrupt', function() {
          lastNode.r = lastNode.radius;
        });
    }

    const $currentGroup = d3.select<SVGGElement, BubbleNode>(currentTarget);
    $currentGroup.transition()
      .duration(2000)
      .ease(d3.easePolyOut)
      .tween('moveIn', function() {
        console.log('tweenMoveIn', currentNode);
        const startX = currentNode.x;
        const startY = currentNode.y;
        const startR = currentNode.r;
        const ix = d3.interpolateNumber(startX, centerX);
        const iy = d3.interpolateNumber(startY, centerY);
        const ir = d3.interpolateNumber(startR, centerY * 0.5);
        return (t: number) => {
          currentNode.fx = ix(t);
          currentNode.fy = iy(t);
          currentNode.r = ir(t);
          simulation.force('collide', forceCollide);
        };
      })
      .on('end', function() {
        simulation.alphaTarget(0);
        $currentGroup.select('.circle-overlay').classed('hidden', false);
        $currentGroup.select('.node-icon').classed('node-icon--faded', true);
      })
      .on('interrupt', function() {
        console.log('move interrupt', currentNode);
        if (focusedNode !== currentNode) {
          currentNode.r = currentNode.radius;
        }
        currentNode.fx = null;
        currentNode.fy = null;
        simulation.alphaTarget(0);
      });
  });

  // Blur - use namespaced event so it can be removed on re-init
  d3.select(document).on('click.d3bubble', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('#circle-overlay') && focusedNode) {
      const nodeToBlur = focusedNode;
      focusedNode = null;

      nodeToBlur.fx = null;
      nodeToBlur.fy = null;
      simulation.alphaTarget(0.2).restart();

      node.filter((_d, i) => i === nodeToBlur.index)
        .transition()
        .duration(2000)
        .ease(d3.easePolyOut)
        .tween('moveOut', function() {
          console.log('tweenMoveOut', nodeToBlur);
          const startR = nodeToBlur.r;
          const ir = d3.interpolateNumber(startR, nodeToBlur.radius);
          return (t: number) => {
            nodeToBlur.r = ir(t);
            simulation.force('collide', forceCollide);
          };
        })
        .on('end', function() {
          simulation.alphaTarget(0);
        })
        .on('interrupt', function() {
          nodeToBlur.r = nodeToBlur.radius;
          simulation.alphaTarget(0);
        });

      // Hide all circle-overlay
      d3.selectAll('.circle-overlay').classed('hidden', true);
      d3.selectAll('.node-icon').classed('node-icon--faded', false);
    }
  });

  function ticked(): void {
    node
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .select('circle')
      .attr('r', (d) => d.r);
  }

  function runAnimation(): void {
    forceCollide = d3.forceCollide<BubbleNode>((d) => d.r + 1);

    simulation = d3.forceSimulation<BubbleNode>()
      .force('charge', d3.forceManyBody())
      .force('collide', forceCollide)
      .force('x', d3.forceX(centerX).strength(strength))
      .force('y', d3.forceY(centerY).strength(strength));

    currentSimulation = simulation;

    simulation.nodes(nodes).on('tick', ticked);
  }

  onReady(runAnimation);
}

/**
 * Stop the current simulation if running
 */
export function stopSimulation(): void {
  if (currentSimulation) {
    currentSimulation.stop();
    currentSimulation = null;
  }
}
