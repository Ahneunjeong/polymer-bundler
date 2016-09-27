/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import * as dom5 from 'dom5';
import {ASTNode} from 'parse5';

export function prepend(parent: ASTNode, node: ASTNode) {
  if (parent.childNodes && parent.childNodes.length) {
    dom5.insertBefore(parent, parent.childNodes[0], node);
  } else {
    dom5.append(parent, node);
  }
}

export function prependAll(parent: ASTNode, nodes: ASTNode[]) {
  let moveIndex = nodes.length - 1;
  while (moveIndex >= 0) {
    const nodeToMove = nodes[moveIndex];
    dom5.remove(nodeToMove);
    prepend(parent, nodeToMove);
    moveIndex--;
  }
}

export function insertAllBefore(
    target: ASTNode, oldNode: ASTNode, nodes: ASTNode[]) {
  let lastNode = oldNode;
  for (let n = nodes.length - 1; n >= 0; n--) {
    const node = nodes[n];
    dom5.insertBefore(target, lastNode, node);
    lastNode = node;
  }
}

/**
 * Return all sibling nodes following node.
 */
export function siblingsAfter(node: ASTNode): ASTNode[] {
  const siblings: ASTNode[] = Array.from(node.parentNode!.childNodes!);
  return siblings.slice(siblings.indexOf(node) + 1);
}