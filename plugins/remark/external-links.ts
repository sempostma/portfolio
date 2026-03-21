import { visit } from 'unist-util-visit';
import { definitions } from 'mdast-util-definitions';

const onlyUnique = (v: any, i: number, a: any[]) => a.indexOf(v) === i;

const refererWhitelist = [
  'chromewebstore.google.com',
  'medium.com',
  'casttosonos.com',
  'youtube.com/watch?v=IBx0BjxkfEI',
];

const absolute = (url: string) => /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(url);

export default function remarkExternalLinks() {
  return (tree: any) => {
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
            props.rel = (props.rel || [])
              .concat('nofollow', 'noopener', 'noreferrer')
              .filter(onlyUnique);
          }
        }
      }
    });
  };
}
