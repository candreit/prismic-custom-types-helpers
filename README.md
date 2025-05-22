# Prismic Custom Types

`prismic-custom-types-helpers` is a CLI tool designed to help replicate JSON data for custom types in Prismic. It simplifies the process of creating multiple tabs in your custom type JSON structure by replicating the data from the first tab.

## Installation

To use this tool, clone the repository and install the dependencies:

```sh
npm i -g
```

## Usage

### Command: `replicate-tabs`

The `replicate-tabs` command replicates JSON data from the first tab to additional tabs specified as arguments.

#### Arguments

- `levels`: A comma-separated list of tab names to replicate. For example: `level_1,level_2,VIP`.

#### Prerequisites

Before running the command, ensure that the JSON data for the first tab is copied to your clipboard. This JSON should represent the structure of the first tab in your Prismic custom type.

#### Example

1. Copy the JSON data for the first tab from Prismic to your clipboard.
2. Run the following command:

```sh
prismic-custom-types-helpers replicate-tabs level_1,level_2,VIP
```

This will:
- Create new tabs named `level_1`, `level_2`, and `VIP`.
- Replicate the fields from the first tab into these new tabs, prefixing the keys with the tab name (e.g., `level_1_fieldName`).

#### Output

- The updated JSON structure will be copied back to your clipboard.
- The tool will log the progress and notify you when the process is complete.

### Example Workflow

1. Copy the following JSON to your clipboard (example structure for the first tab):

```json
  "Main": {
    "field_1": "value_1",
    "field_2": "value_2"
  }
```

2. Run the command:

```sh
prismic-custom-types-helpers replicate-tabs level_1,level_2,VIP
```

3. The resulting JSON will look like this and will be copied to your clipboard:

```json
{
  "Main": {
    "field_1": "value_1",
    "field_2": "value_2"
  },
  "Level 1": {
    "level_1_field_1": "value_1",
    "level_1_field_2": "value_2"
  },
  "Level 2": {
    "level_2_field_1": "value_1",
    "level_2_field_2": "value_2"
  },
  "VIP": {
    "VIP_field_1": "value_1",
    "VIP_field_2": "value_2"
  }
}
```

In this example:
- The `Main` object retains the original fields (`field_1` and `field_2`).
- Additional tabs (`Level 1`, `Level 2`, `VIP`) are created with replicated fields, prefixed by their respective tab names.
