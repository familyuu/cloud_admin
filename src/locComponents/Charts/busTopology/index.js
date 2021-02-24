import React from 'react';
import { FrownOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import NodeCard from './node';
import SVG from './svg';
import styles from './index.less';

class TopologyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNode: null,
    };
  }

  triggerDisplay = (targetNode) => (targetSvg) => {
    this.setState({
      currentNode: targetNode,
    });
  };

  render() {
    const { nodes, title } = this.props;
    const { currentNode } = this.state;
    const svgHeight = (nodes.length + 2) * 50;

    return (
      <Card title={title} bordered={false} headStyle={{ 'font-size': 14, border: 'none' }}>
        {nodes.length ? (
          <div className={styles.svg}>
            <SVG
              nodes={nodes}
              event={this.triggerDisplay}
              width="200"
              height={svgHeight}
              gap="30"
            />
            <div className={styles.node}>
              {currentNode ? <NodeCard node={currentNode} /> : null}
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            <FrownOutlined />
            No data!
          </div>
        )}
      </Card>
    );
  }
}

export default TopologyCanvas;
