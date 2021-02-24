import React from 'react';
import { Card } from 'antd';
import BasicList from '@/locComponents/BasicList';
const makeList = (jsonObject) => {
  let List = [];
  let listItem = {};
  Object.keys(jsonObject).forEach((key) => {
    if (key !== '_id') {
      listItem = {
        title: key,
        value: jsonObject[key].toString(),
      };
      List.push(listItem);
    }
  });
  return List;
};
const NodeCard = ({ node }) => {
  return <BasicList listTitle={`${node.name}`} list={makeList(node)} />;
};

export default NodeCard;
