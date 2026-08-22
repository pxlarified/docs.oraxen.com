# OraxenDocs

This is a small Vercel deployment that permanently redirects every path to the
current documentation site at [docs.oraxen.com](https://docs.oraxen.com).

For example:

- `/introduction` → `https://docs.oraxen.com/introduction`
- `/tutorials/123` → `https://docs.oraxen.com/tutorials/123`

The redirect is configured in [`vercel.json`](./vercel.json). Query strings are
preserved by Vercel automatically.
