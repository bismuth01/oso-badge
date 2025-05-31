# OSO Badge
A Github README badge that shows how many other packages depends on your repository, directly and indirectly.
Works only for repositories supported by [OSO](https://www.opensource.observer/)

All supported repositories can be found [here](https://github.com/opensource-observer/oss-directory/tree/main/data/projects)

# Demo
For [go-ethereum](https://github.com/ethereum/go-ethereum)
```
![go-ethereum-badge](https://oso-badge-sbom.vercel.app/badge?repo=https://github.com/ethereum/go-ethereum)
```

![go-ethereum-badge](https://oso-badge-sbom.vercel.app/badge?repo=https://github.com/ethereum/go-ethereum)

For [go-libp2p](https://github.com/libp2p/go-libp2p)
```
![go-libp2p](https://oso-badge-sbom.vercel.app/badge?repo=https://github.com/libp2p/go-libp2p)
```
![go-libp2p](https://oso-badge-sbom.vercel.app/badge?repo=https://github.com/libp2p/go-libp2p)

# How do use
Clone this repository, rename `.env-local` to `.env` and fill in your OSO API key.
Deploy using vercel and done!

The SVG badge image will come at `<your vecel deployed link>/badge?repo=<repository link>`

# How it work ?
It uses OSO GraphQL API to fetch the `artifactId` using the repository URL and uses the `artifactId` to get projects that are dependent of that repository using SBOMs.

It uses Vercel's serverless functions which are easy to deploy and free.
