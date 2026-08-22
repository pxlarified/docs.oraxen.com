<h1 align="center">
  <br>
  Oraxen Documentation
  <br>
</h1>

<h4 align="center">The official documentation website for creating custom Minecraft content with Oraxen.</h4>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=flat-square&logo=node.js&logoColor=white">
  <img alt="Docusaurus" src="https://img.shields.io/badge/Docusaurus-3.10.2-3ECC5F?style=flat-square&logo=docusaurus&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black">
</p>

## Overview

Oraxen Documentation is the source for the official [Oraxen documentation website](https://oraxen.mizius.com). It explains how to configure and use Oraxen, create custom items and resources, integrate supported plugins, and extend Oraxen through its API.

The website is built with Docusaurus. Documentation pages are written in MDX and organized through a manually maintained sidebar.

## Features

- Documents Oraxen installation, configuration, commands, recipes, settings, resource-pack hosting, and usage.
- Covers custom items, glyphs, HUDs, text effects, sounds, paintings, mechanics, and item data.
- Includes tutorials and compatibility guides for supported plugins and world generators.
- Provides developer guides for compiling Oraxen, adding mechanics and integrations, and using the API.
- Supports reusable React components inside MDX documentation pages.
- Includes syntax highlighting for Java, Groovy, YAML, PowerShell, and batch files.
- Builds a static website suitable for production hosting.

## Requirements

- Node.js 20 or newer.
- npm.

## Installation

Install the project dependencies.

```sh
npm install
```

## Development

Start the local development server with live reload.

```sh
npm run start
```

Create a production build.

```sh
npm run build
```

The generated static site is written to `build/`. Preview it locally after building.

```sh
npm run serve
```

Project entry points.

- Documentation pages - `docs/`
- Sidebar configuration - `sidebars.js`
- Site configuration - `docusaurus.config.js`
- Custom components - `src/components/`
- Theme styles - `src/css/custom.css`
