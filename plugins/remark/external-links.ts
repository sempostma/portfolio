import { definitions } from 'mdast-util-definitions';
import { visit } from 'unist-util-visit';

const onlyUnique = (v: unknown, i: number, a: unknown[]) => a.indexOf(v) === i;

const refererWhitelist = [
  'medium.com',
];

const absolute = (url: string) => /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(url);

export default function remarkExternalLinks() {
  return (tree: Parameters<typeof definitions>[0]) => {
    const definition = definitions(tree);

    visit(tree, node => {
      if (node.type === 'link' || node.type === 'linkReference') {
        const ctx = node.type === 'link' ? node : definition(node.identifier);

        if (!ctx) return;

        if (absolute(ctx.url)) {
          const data = node.data || (node.data = {});
          const props = /** @type {Properties} */ (
            data.hProperties || (data.hProperties = {})
          );

          props.target = '_blank';

          if (!refererWhitelist.some(x => ctx.url.includes(x))) {
            props.rel = (props.rel as string[] || [])
              .concat('nofollow', 'noopener', 'noreferrer')
              .filter(onlyUnique);
          }
        }
      }
    });
  };
}
