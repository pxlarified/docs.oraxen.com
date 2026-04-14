import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import PluginFileTree from "./components/PluginFileTree";
import Highlight from "./components/Highlight";

const docsComponents = getDocsMDXComponents();

export const useMDXComponents = (components?: Record<string, any>) => ({
  ...docsComponents,
  PluginFileTree,
  Highlight,
  ...(components || {}),
});
