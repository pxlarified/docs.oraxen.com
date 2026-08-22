/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {docsSidebar: [
  'introduction/index', 'faq',
  {type: 'category', label: '⚙️ Configuration', link: {type: 'doc', id: 'configuration/index'}, items: [
    {type: 'category', label: '🗡️ Items', link: {type: 'doc', id: 'configuration/items/index'}, items: [
      {type: 'category', label: '🔢 Data', items: ['configuration/items/data/components', 'configuration/items/data/properties']},
      'configuration/items/appearance', 'configuration/items/mechanics',
    ]},
    {type: 'category', label: '🖼️ Glyphs', link: {type: 'doc', id: 'configuration/glyphs/index'}, items: ['configuration/glyphs/huds']},
    {type: 'category', label: '✨ Text Effects', link: {type: 'doc', id: 'configuration/texteffects/index'}, items: []},
    {type: 'category', label: '🔊 Sounds', link: {type: 'doc', id: 'configuration/sounds/index'}, items: []},
    {type: 'category', label: '🏞️ Paintings', link: {type: 'doc', id: 'configuration/paintings/index'}, items: []},
  ]},
  {type: 'category', label: '🕹️ Usage', link: {type: 'doc', id: 'usage/index'}, items: [
    {type: 'category', label: '📖 Tutorials', link: {type: 'doc', id: 'usage/tutorials/index'}, items: [
      'usage/tutorials/13lfg3', 'usage/tutorials/23ho7', 'usage/tutorials/39d3x', 'usage/tutorials/491d3', 'usage/tutorials/9d13l', 'usage/tutorials/a7k2m', 'usage/tutorials/c82mx', 'usage/tutorials/d017g', 'usage/tutorials/d31l5f', 'usage/tutorials/f3g7k', 'usage/tutorials/f4q9x', 'usage/tutorials/g7p4t', 'usage/tutorials/h2k8m', 'usage/tutorials/v6n8r',
    ]},
    'usage/commands', 'usage/recipes', 'usage/merging', 'usage/hosting', 'usage/settings',
  ]},
  {type: 'category', label: '🤝 Compatibility', link: {type: 'doc', id: 'compatibility/index'}, items: [
    'compatibility/placeholderapi', 'compatibility/skript', 'compatibility/viaversion', 'compatibility/packlayer', 'compatibility/modelengine', 'compatibility/mythichud', 'compatibility/mythiccrucible', 'compatibility/mythicmobs', 'compatibility/mmoitems', 'compatibility/betterhud', 'compatibility/blocklocker', 'compatibility/ecoitems', 'compatibility/executableitems', 'compatibility/worldedit',
    {type: 'category', label: '🧱 Bedrock', link: {type: 'doc', id: 'compatibility/bedrock/index'}, items: [
      {type: 'category', label: '🪶 FeatherConvert', link: {type: 'doc', id: 'compatibility/bedrock/feather/index'}, items: ['compatibility/bedrock/feather/usage']},
    ]},
    {type: 'category', label: '🌍 World Generators', link: {type: 'doc', id: 'compatibility/generators/index'}, items: ['compatibility/generators/iris', 'compatibility/generators/terralith', 'compatibility/generators/customoregen']},
    {type: 'category', label: '📂 Archives', link: {type: 'doc', id: 'compatibility/archives/index'}, items: ['compatibility/archives/bossshoppro', 'compatibility/archives/cratereloaded', 'compatibility/archives/trmenu', 'compatibility/archives/epicworldgenerator', 'compatibility/archives/realisticworldgenerator']},
  ]},
  {type: 'category', label: '🔧 Developers', link: {type: 'doc', id: 'developers/index'}, items: ['developers/compiling', 'developers/addmechanic', 'developers/addcompatibility', 'developers/addpackhosting', 'developers/contributing', 'developers/api']},
]};

export default sidebars;
