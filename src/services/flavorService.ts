/**
 * 前端按需加载风味网络数据服务 (Flavor Data Async Loader & Service)
 * 数据放置于 public/data/flavor/，避免打包进主 bundle，减小首屏下载体积。
 */

import {
  buildUndirectedEdgeSet,
  createFlavorEngine,
  type FlavorDataset,
} from '@/domain/flavor'

let flavorEnginePromise: Promise<ReturnType<typeof createFlavorEngine>> | null = null

/**
 * 异步获取风味计算引擎实例 (单例缓存)
 */
export async function getFlavorEngine(): Promise<ReturnType<typeof createFlavorEngine>> {
  if (flavorEnginePromise) {
    return flavorEnginePromise
  }

  flavorEnginePromise = (async () => {
    // 并行按需请求 public/data/flavor/ 下的静态数据文件
    const [aliasRes, canonRes, zhMapRes, simRes, edgesRes, catRes] = await Promise.all([
      fetch('/data/flavor/alias_map.json'),
      fetch('/data/flavor/zh_canonical.json'),
      fetch('/data/flavor/zh_map.json'),
      fetch('/data/flavor/similarity_top20.json'),
      fetch('/data/flavor/edges.json'),
      fetch('/data/flavor/category_map.json'),
    ])

    if (!aliasRes.ok || !canonRes.ok || !zhMapRes.ok || !simRes.ok || !edgesRes.ok) {
      throw new Error('加载风味拓扑数据失败，请确认 public/data/flavor/ 下静态资源完整')
    }

    const [aliasMap, zhCanonical, zhMap, similarityTop20, edges, categoryMap] = await Promise.all([
      aliasRes.json(),
      canonRes.json(),
      zhMapRes.json(),
      simRes.json(),
      edgesRes.json(),
      catRes.ok ? catRes.json() : {},
    ])

    const edgeSet = buildUndirectedEdgeSet(edges)

    const dataset: FlavorDataset = {
      aliasMap,
      zhCanonical,
      zhMap,
      similarityTop20,
      edges,
      edgeSet,
      categoryMap,
    }

    return createFlavorEngine(dataset)
  })()

  return flavorEnginePromise
}
