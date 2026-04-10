/*
<PluginFileTree initialTreeData={[ { id: "assets", name: "assets", children: [ { id: "minecraft", name: "minecraft", hoverText: "This is a namespace.", children: [ { id: "models", name: "models", children: [ { id: "myitems", name: "myitems", children: [ { id: "mycoolmodel.json", name: "mycoolmodel.json", isLeaf: true, }, { id: "mycoolmodel2.json", name: "mycoolmodel2.json", isLeaf: true, } ] }, { id: "blocks", name: "blocks", children: [ { id: "acacia_button.json", name: "acacia_button.json", isLeaf: true, }, { id: "oraxenore.json", name: "oraxenore.json", isLeaf: true, } ] }, ] } ] } ] } ]} />
*/

'use client';

import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Tree, TreeApi, NodeRendererProps } from 'react-arborist';
import {
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaChevronRight,
  FaChevronDown,
  FaInfoCircle,
} from 'react-icons/fa';
import ReactDOM from 'react-dom';

interface TreeNodeData {
  id: string;
  name: string;
  children?: TreeNodeData[];
  hoverText?: string;
}

interface NodeProps extends NodeRendererProps<TreeNodeData> {
  currentTheme: string | null;
  mounted: boolean;
}

interface PluginFileTreeProps {
  initialTreeData: TreeNodeData[];
}

const Node = React.memo(function Node({ node, style, dragHandle, currentTheme, mounted }: NodeProps) {
  const Icon = node.isLeaf ? FaFile : node.isOpen ? FaFolderOpen : FaFolder;
  const ArrowIcon = node.isInternal ? (node.isOpen ? FaChevronDown : FaChevronRight) : null;

  const [showCard, setShowCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const infoIconRef = useRef<HTMLButtonElement>(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowCard(prev => !prev);
  };

  const calculateCardPosition = useCallback(() => {
    if (infoIconRef.current && showCard) {
      const iconRect = infoIconRef.current.getBoundingClientRect();
      const cardWidth = 280;
      const cardHeight = cardRef.current?.offsetHeight || 120;
      const margin = 8;

      let top = iconRect.top;
      let left = iconRect.right + margin;

      if (top + cardHeight > window.innerHeight) {
        top = window.innerHeight - cardHeight - margin;
      }
      if (top < 0) {
        top = margin;
      }

      if (left + cardWidth > window.innerWidth) {
        left = iconRect.left - cardWidth - margin;
      }

      if (left < 0) {
        left = 0;
      }

      setCardPosition({ top, left });
    }
  }, [showCard]);

  useLayoutEffect(() => {
    if (showCard) {
      calculateCardPosition();
    }
  }, [showCard, calculateCardPosition, node.data.hoverText]);

  useEffect(() => {
    const handleResize = () => calculateCardPosition();
    if (showCard) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showCard, calculateCardPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (cardRef.current && !cardRef.current.contains(event.target) &&
          infoIconRef.current && !infoIconRef.current.contains(event.target)) {
        setShowCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isDark = mounted && currentTheme === 'dark';

  // Nextra-aligned colors
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const arrowColor = isDark ? '#6b7280' : '#9ca3af';
  const folderColor = isDark ? '#fbbf24' : '#f59e0b';
  const fileColor = isDark ? '#6b7280' : '#9ca3af';
  const infoIconColor = isDark ? '#4b5563' : '#d1d5db';
  const infoIconHoverColor = isDark ? '#9ca3af' : '#6b7280';
  const rowHoverBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';

  // Tooltip colors matching Nextra popups
  const cardBgColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBorderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)';
  const cardShadow = isDark
    ? '0 4px 16px rgba(0, 0, 0, 0.4)'
    : '0 4px 16px rgba(0, 0, 0, 0.08)';

  const handleNodeKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && node.isInternal) {
      if (e.key === ' ') e.preventDefault();
      node.toggle();
    }
  };

  return (
    <div
      ref={dragHandle}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        cursor: node.isInternal ? 'pointer' : 'default',
        position: 'relative',
        color: textColor,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 8,
        borderRadius: '4px',
        backgroundColor: isHovered ? rowHoverBg : 'transparent',
        transition: 'background-color 0.15s ease',
      }}
      className="node-container"
      role="treeitem"
      aria-expanded={node.isInternal ? node.isOpen : undefined}
      tabIndex={0}
      onKeyDown={handleNodeKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e: React.MouseEvent) => {
        if (infoIconRef.current?.contains(e.target as HTMLElement)) {
          return;
        }
        node.isInternal && node.toggle();
      }}
    >
      {/* Arrow icon container */}
      <div style={{
        width: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {ArrowIcon && (
          <ArrowIcon
            style={{
              fontSize: '0.65em',
              color: arrowColor,
              transition: 'transform 0.15s ease',
            }}
          />
        )}
      </div>

      {/* File/Folder icon */}
      <div style={{
        marginRight: '8px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <Icon
          color={node.isLeaf ? fileColor : folderColor}
          style={{ fontSize: '0.95em' }}
        />
      </div>

      {/* File name */}
      <span style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexGrow: 1,
        minWidth: 0,
        fontSize: '0.875rem',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      }}>
        {node.data.name}
      </span>

      {/* Info icon - show on hover or when card is open */}
      {node.data.hoverText && (
        <>
          <button
            type="button"
            ref={infoIconRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1,
              marginLeft: '8px',
              flexShrink: 0,
              background: 'none',
              border: 'none',
              padding: '4px',
              borderRadius: '4px',
              opacity: isHovered || showCard ? 1 : 0,
              transition: 'opacity 0.15s ease, color 0.15s ease',
            }}
            aria-label={`More info about ${node.data.name}`}
            aria-describedby={`card-${node.id}`}
            aria-expanded={showCard}
            onClick={handleInfoClick}
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
          >
            <FaInfoCircle style={{ fontSize: '0.75em', color: (isIconHovered || showCard) ? infoIconHoverColor : infoIconColor }} />
          </button>

          {showCard && ReactDOM.createPortal(
            <div
              ref={cardRef}
              id={`card-${node.id}`}
              role="tooltip"
              aria-hidden={!showCard}
              style={{
                position: 'fixed',
                top: cardPosition.top,
                left: cardPosition.left,
                width: '280px',
                padding: '10px 12px',
                backgroundColor: cardBgColor,
                border: `1px solid ${cardBorderColor}`,
                borderRadius: '6px',
                boxShadow: cardShadow,
                zIndex: 1000,
                fontSize: '0.8125rem',
                color: textColor,
                lineHeight: '1.5',
              }}
            >
              {node.data.hoverText}
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  );
});

export default function PluginFileTree({ initialTreeData }: PluginFileTreeProps) {
  const treeApiRef = useRef<TreeApi<TreeNodeData> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const PADDING = 16;
  const PADDING_VERTICAL = 12;
  const MAX_WIDTH_PX = 680;
  const [containerWidth, setContainerWidth] = useState(MAX_WIDTH_PX);

  const [currentTheme, setCurrentTheme] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const getTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') ||
                     document.documentElement.style.colorScheme === 'dark' ||
                     document.documentElement.getAttribute('data-theme') === 'dark';
      return isDark ? 'dark' : 'light';
    };

    const theme = getTheme();
    setCurrentTheme(theme);

    const observer = new MutationObserver(() => {
      const theme = getTheme();
      setCurrentTheme(theme);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });

    return () => observer.disconnect();
  }, []);

  const ROW_HEIGHT = 28;
  const [treeHeight, setTreeHeight] = useState(ROW_HEIGHT);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Use the container's actual width directly
        const actualWidth = containerRef.current.clientWidth;
        setContainerWidth(actualWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateLayout = useCallback(() => {
    if (!treeApiRef.current) return;

    const visibleNodesCount = treeApiRef.current.visibleNodes.length;
    const nodesHeight = visibleNodesCount * ROW_HEIGHT;
    const nextTreeHeight = Math.max(nodesHeight, ROW_HEIGHT);
    setTreeHeight(nextTreeHeight);
  }, [ROW_HEIGHT]);

  useLayoutEffect(() => {
    updateLayout();
  }, [containerWidth, updateLayout]);

  useEffect(() => {
    const id = requestAnimationFrame(updateLayout);
    return () => cancelAnimationFrame(id);
  }, [initialTreeData, updateLayout]);

  const isDark = mounted && currentTheme === 'dark';

  // Match Nextra code block styling
  const containerBgColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  const containerBorderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)';

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: `${MAX_WIDTH_PX}px`,
        borderRadius: '8px',
        padding: `${PADDING_VERTICAL}px ${PADDING}px`,
        overflow: 'hidden',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
        height: `${treeHeight + (PADDING_VERTICAL * 2)}px`,
        backgroundColor: containerBgColor,
        border: `1px solid ${containerBorderColor}`,
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Tree
        ref={treeApiRef}
        initialData={initialTreeData}
        indent={24}
        rowHeight={ROW_HEIGHT}
        height={treeHeight}
        width={containerWidth - (PADDING * 2)}
        className="file-tree"
        onToggle={() => requestAnimationFrame(updateLayout)}
        openByDefault={false}
      >
        {(nodeProps) => <Node {...nodeProps} currentTheme={currentTheme} mounted={mounted} />}
      </Tree>
    </div>
  );
}
