import React from 'react';
import {Details} from '@docusaurus/theme-common/Details';

function Branch({nodes}) {
  return (
    <ul className="file-tree-list">
      {nodes.map((node) => (
        <li key={node.id}>
          {node.children?.length ? (
            <Details
              open
              summary={<summary title={node.hoverText}>📁 {node.name}</summary>}>
              <Branch nodes={node.children} />
            </Details>
          ) : <span title={node.hoverText}>📄 {node.name}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function PluginFileTree({initialTreeData = []}) {
  return <div className="file-tree"><Branch nodes={initialTreeData} /></div>;
}
