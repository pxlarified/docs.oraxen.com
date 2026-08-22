import React, {Children, cloneElement, isValidElement} from 'react';
import Admonition from '@theme/Admonition';
import ThemeDetails from '@theme/Details';

function CalloutIcon({path}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export function Callout({children, type = 'info'}) {
  const types = {
    danger: {admonitionType: 'danger'},
    important: {
      admonitionType: 'info',
      title: 'important',
      iconPath: 'M12 2 13.8 8.2 20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm6.4 11.6.9 2.6 2.7.8-2.7.8-.9 2.6-.9-2.6-2.7-.8 2.7-.8.9-2.6ZM5.6 13.8l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z',
    },
    info: {
      admonitionType: 'info',
      iconPath: 'M12 3C7 3 3 6.6 3 11.1c0 2.7 1.5 5.1 3.8 6.6L6 21l3.8-2.1c.7.2 1.4.3 2.2.3 5 0 9-3.6 9-8.1S17 3 12 3Zm-.9 7h2v6h-2v-6Zm1-3.2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z',
    },
    note: {
      admonitionType: 'note',
      iconPath: 'M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm8 1.5V8h3.5L14 4.5ZM8 11h8v1.8H8V11Zm0 4h6v1.8H8V15Z',
    },
    tip: {
      admonitionType: 'tip',
      iconPath: 'M12 3a6 6 0 0 0-3.7 10.7c.7.6 1.2 1.4 1.3 2.3h4.8c.1-.9.6-1.7 1.3-2.3A6 6 0 0 0 12 3Zm-2 15h4v2h-4v-2Zm7.5-10.2c-2.7.1-4.7 1.2-5.8 3.2-.7-1.2-1.8-2-3.2-2.4.1 2.5 1.3 4.1 3.2 4.9 2.5-.9 4.6-2.9 5.8-5.7Z',
    },
    warning: {
      admonitionType: 'warning',
      iconPath: 'M12 2 22 20H2L12 2Zm-1 6v6h2V8h-2Zm0 8v2h2v-2h-2Z',
    },
  };
  const normalizedType = type.toLowerCase();
  const resolvedType = types[normalizedType] ? normalizedType : 'info';
  const callout = types[resolvedType];
  return (
    <Admonition
      type={callout.admonitionType}
      title={callout.title || resolvedType}
      {...(callout.iconPath ? {icon: <CalloutIcon path={callout.iconPath} />} : {})}
      className={`oraxen-callout oraxen-callout--${resolvedType}`}>
      {children}
    </Admonition>
  );
}

export function Details({children}) {
  const items = Children.toArray(children);
  const summary = items.find((child) => isValidElement(child) && child.type === 'summary');
  return (
    <ThemeDetails className="oraxen-details" summary={summary}>
      {items.filter((child) => child !== summary)}
    </ThemeDetails>
  );
}

export function Steps({children}) {
  return <div className="oraxen-steps">{children}</div>;
}

function Tab({children, label}) {
  return <section className="oraxen-tab" data-label={label}>{children}</section>;
}

export function Tabs({children, items = []}) {
  return (
    <div className="oraxen-tabs">
      {Children.map(children, (child, index) =>
        isValidElement(child) ? cloneElement(child, {label: items[index]}) : child,
      )}
    </div>
  );
}
Tabs.Tab = Tab;

// Kept for source-compatible imports. Markdown tables remain native MDX tables.
export function Table({children}) {
  return <table>{children}</table>;
}

export {Tab};
