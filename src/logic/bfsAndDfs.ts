import jsdom from "jsdom";

const dom = new jsdom.JSDOM(`<!DOCTYPE html>
<body>
	<div>
		<div>	
			<span></span>
			<span></span>
		</div>
		<a></a>
		<div>
			<span></span>
			<span></span>
		</div>
	</div>
</body>`);

const body = dom.window.document.body;

/**
 * 深度优先遍历
 *
 * 不断获取当前节点的孩子节点
 * @param node 节点
 * @returns 生成器
 */

function* dfs(node: Element): Generator<Element> {
  //遇到一个节点就返回
  //   yield 转让控制器
  yield node;
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      yield* dfs(child);
    }
  }

  return node;
}

// console.log("dfs----");
// for (const node of dfs(body)) {
//   console.log(node.tagName);
// }

function* bfs(node: Element): Generator<Element> {
  const queue = new Array<Element>(1000);

  // queue.unshift(1) 复杂度是O(n)

  let i = 0, // i指针是取数用的
    j = 0; //j指针指向队列头部，插入元素

  queue[j++] = node;

  // i和j指针相等 说明是空队列
  while (i !== j) {
    const node = queue[i++]; // 取数
    yield node;

    if (node.children) {
      for (let k = 0; k < node.children.length; k++) {
        const child = node.children[k];
        queue[j++] = child;
      }
    }
  }
}

console.log("bfs----");
for (const node of bfs(body)) {
  console.log(node.tagName);
}
