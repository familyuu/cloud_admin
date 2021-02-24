import React, { Component, Suspense } from 'react';
import { Tree } from 'antd';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const loop = (TreeData) => {
  return TreeData.map(item => {
    return (
      item.children
      ? (<TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>)
      : (<TreeNode key={item.key} title={item.title} />)
    );
  });
};

class DirTree extends Component {
 
  onSelect = (selectedKeys, e) => {
    console.log(selectedKeys);
    console.log(e);
  };
  render(){
    const { TreeData } = this.props;
    return (
      <DirectoryTree autoExpandParent={false}
                     onSelect={this.onSelect} >
        {loop(TreeData)}
      </DirectoryTree>
    );
  }
}

export default DirTree;