---
description: Learn how to integrate Oraxen custom blocks with Terralith datapack for world generation
---

import { Callout } from 'nextra/components'

# Terralith Datapack Integration

Terralith is a popular datapack that overhauls world generation with new biomes and terrain features. You can integrate your Oraxen custom blocks into Terralith's world generation by modifying the datapack files to include your custom ores and blocks.

<Callout type="warning">
  This method requires manual datapack modification and should be done before world generation. Make sure to backup your datapack files before making changes.
</Callout>

**Download Terralith -** [Terralith on PlanetMinecraft](https://www.planetminecraft.com/data-pack/terralith-overworld-evolved-100-biomes-caves-and-more/)

## Prerequisites

- Terralith datapack downloaded and extracted
- Oraxen custom blocks configured (particularly ores)
- Basic understanding of JSON file editing
- Text editor (VS Code recommended for bulk editing)

## Step 1 - Get Your Block Information

First, you need to obtain the note block data for your custom Oraxen block using the `/oraxen blockinfo` command.

```
/oraxen blockinfo [your_block_id]
```

For example, if you have a custom ore called `deepslate_valorite_ore`:

```
/oraxen blockinfo deepslate_valorite_ore
```

This will return information like:
- **Note** 6
- **Instrument** bassdrum

<Callout type="info">
  Write down these values as you'll need them for the configuration files.
</Callout>

## Step 2 - Create the Configured Feature

Navigate to `Terralith.zip\data\terralith\worldgen\configured_feature` and create a new JSON file for your ore (e.g., `valorite_ore.json`).

```json
{
  "type": "minecraft:ore",
  "config": {
    "discard_chance_on_air_exposure": 0.0,
    "size": 8,
    "targets": [
      {
        "state": {
          "Name": "minecraft:note_block",
          "Properties": {
            "instrument": "basedrum",
            "note": "6",
            "powered": "false"
          }
        },
        "target": {
          "predicate_type": "minecraft:tag_match",
          "tag": "minecraft:deepslate_ore_replaceables"
        }
      }
    ]
  }
}
```

**Configuration Options**
- `size` - Controls the size of ore veins (8 is a medium size)
- `instrument` and `note` - Use the values from your `/oraxen blockinfo` command
- `tag` - Choose appropriate replacement target (`minecraft:stone_ore_replaceables` for stone, `minecraft:deepslate_ore_replaceables` for deepslate)

## Step 3 - Create the Placed Feature

Navigate to `Terralith.zip\data\terralith\worldgen\placed_feature` and create another JSON file with the same name (e.g., `valorite_ore.json`).

```json
{
  "feature": "terralith:valorite_ore",
  "placement": [
    {
      "type": "minecraft:count",
      "count": 4
    },
    {
      "type": "minecraft:in_square"
    },
    {
      "type": "minecraft:height_range",
      "height": {
        "type": "minecraft:uniform",
        "min_inclusive": { "absolute": -64 },
        "max_inclusive": { "absolute": -5 }
      }
    },
    {
      "type": "minecraft:biome"
    }
  ]
}
```

**Configuration Options**
- `feature` - Must match your configured feature name (`terralith:your_ore_name`)
- `count` - Number of ore veins per chunk (4 is moderate)
- `min_inclusive`/`max_inclusive` - Y-level range for ore generation (-64 to -5 for deep underground)

## Step 4 - Add to Biome Files

Navigate to `Terralith.zip\data\terralith\worldgen\biome` and select the biome files where you want your ore to spawn.

<Callout type="info">
  **Pro Tip -** Use VS Code's "Find and Replace in Files" feature to add your ore to multiple biomes at once. This saves significant time when adding ores to many biomes.
</Callout>

In each biome file, locate the `features` section and find the **seventh array** (index 6). Add your ore reference:

```json
{
  "features": [
    [...],
    [...],
    [...],
    [...],
    [...],
    [...],
    [
      "existing_features...",
      "terralith:valorite_ore"
    ]
  ]
}
```

## Step 5 - Package and Deploy

1. **Archive the datapack** - Compress the modified Terralith folder back into a ZIP file
2. **Deploy to server** - Place the datapack in your `world/datapacks` folder
3. **Generate new world** - The datapack must be present **before** world generation

<Callout type="warning">
  Datapacks only affect newly generated chunks. Existing world chunks will not contain your custom ores.
</Callout>

## Advanced Usage

### Adding Non-Ore Blocks

This method isn't limited to ores. You can add any Oraxen custom block to world generation by:

1. Using appropriate feature types (e.g., `minecraft:simple_block` for single blocks)
2. Adjusting placement rules for your specific use case
3. Modifying the appropriate biome feature arrays

### Multiple Block Variants

For blocks with multiple variants, create separate configured and placed features for each variant, ensuring each has unique note/instrument combinations.

## Troubleshooting

- **Ore not spawning** - Verify the note/instrument values match your `/oraxen blockinfo` output
- **Wrong biomes** - Check that you added the feature to the correct array index (7th array)
- **Datapack errors** - Validate your JSON syntax using a JSON validator

<Callout type="info">
  While this process may seem complex initially, it provides full control over how your Oraxen blocks integrate with Terralith's enhanced world generation.
</Callout>