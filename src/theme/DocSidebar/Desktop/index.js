import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';

import styles from './styles.module.css';

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}) {
  const {
    docs: {
      sidebar: {hideable},
    },
  } = useThemeConfig();

  return (
    <div className={clsx(styles.sidebar, isHidden && styles.sidebarHidden)}>
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
