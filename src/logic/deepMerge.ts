/**
 * 合并对象
 * 需要根据业务自行重写
 * 不一定就是这个实现逻辑
 */

function deepMergeArray(a: any[], b: any[]) {
  return a.concat(b);
}

function deepMergeObject(a: any, b: any) {
  //   return Object.assign({}, a, b);
  const obj = {};
  for (let key in b) {
    if (key in a) {
      // 两者都有共同key，再合并
      obj[key] = deepMerge(a[key], b[key]);
    } else {
      obj[key] = b;
    }
  }
}

const aa = {
  person: {
    name: "2",
  },
};

const bb = {
  person: {
    age: 18,
  },
};

console.log(deepMergeObject(aa, bb));

type Literal = number | string | boolean | bigint;

function deepMerge(a: Literal, b: Literal);
function deepMerge(a: any, b: any) {
  // 两者返回有值的结果
  if (!a || !b) {
    return a || b;
  }

  //   基础类型不等
  if (typeof a !== typeof b) {
    return b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return deepMergeArray(a, b);
  }

  //   函数
  if (typeof a === "function") {
    return b;
  }

  if (typeof a === "object") {
    return deepMergeObject(a, b);
  }
}
