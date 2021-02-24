import React from 'react';
import styles from './svg.less';
class SVG extends React.PureComponent {
  render() {
    const { nodes, event } = this.props;
    const { width, height, gap } = this.props;
    const rectStartY = 40;
    const publicY = 47;
    const clusterY = 50;
    return (
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect
            fill="#fff"
            id="canvas_background"
            height={height + 2}
            width={width + 2}
            y="-1"
            x="-1"
          />
          <g
            display="none"
            overflow="visible"
            y="0"
            x="0"
            height="100%"
            width="100%"
            id="canvasGrid">
            <rect
              fill="url(#gridpattern)"
              style={{ 'stroke-width': '0' }}
              y="0"
              x="0"
              height="100%"
              width="100%"
            />
          </g>
        </g>
        <g>
          <title>Public network</title>
          <rect
            rx="6"
            id="svg_1"
            height={height - 15}
            width="10"
            y="10"
            x="25"
            style={{ 'stroke-width': '0.5', stroke: '#000', fill: '#56aaff' }}
          />
          <text
            id="svg_3"
            y="175"
            x="2"
            transform="rotate(90 28.999999999999975,169.00000000000003)"
            style={{
              'text-anchor': 'start',
              'font-family': 'Helvetica, Arial, sans-serif',
              'font-size': '18',
              'stroke-opacity': 'null',
              stroke: '#000',
              fill: '#000000',
            }}>
            Public
          </text>
        </g>
        <g>
          <title>Cluster network</title>
          <rect
            rx="6"
            id="svg_2"
            height={height - 15}
            width="10"
            y="10"
            x="180"
            style={{ 'stroke-width': '0.5', stroke: '#000', fill: '#007f3f' }}
          />
          <text
            id="svg_4"
            y="175"
            x="154"
            transform="rotate(90 185.5,169.00000000000003) "
            style={{
              'text-anchor': 'start',
              'font-family': 'Helvetica, Arial, sans-serif',
              'font-size': '18',
              'stroke-opacity': 'null',
            }}
            stroke="#000"
            fill="#000000">
            Cluster
          </text>
        </g>
        <g>
          {nodes.map((node, index) => {
            if (node.public_ip && node.cluster_ip) {
              return (
                <g id={'svg5' + index}>
                  <title>{`[monitor, osd]`}</title>
                  <line
                    x1="35"
                    x2="100"
                    y1={publicY + index * gap}
                    y2={publicY + index * gap}
                    style={{ stroke: '#007fff', 'stroke-width': 3.5, fill: '#none' }}
                  />
                  <a href="javascript:;">
                    <rect
                      rx="5"
                      height="20"
                      width="20"
                      y={rectStartY + index * gap}
                      x="100"
                      onClick={event(node)}
                      stroke="#000"
                      style={{ 'stroke-opacity': null, 'stroke-width': 1.5, cursor: 'pointer' }}
                    />
                  </a>
                  <line
                    x1="120"
                    x2="180"
                    y1={clusterY + index * gap}
                    y2={clusterY + index * gap}
                    stroke="#007f00"
                    fill="#fff"
                    style={{
                      'stroke-linecap': 'null',
                      'stroke-linejoin': 'null',
                      'stroke-width': '2.5',
                    }}
                  />
                </g>
              );
            } else if (node.public_ip) {
              return (
                <g id={'svg5' + index}>
                  <title>{`[monitor]`}</title>
                  <line
                    x1="35"
                    x2="100"
                    y1={publicY + index * gap}
                    y2={publicY + index * gap}
                    style={{
                      stroke: '#007fff',
                      'stroke-linecap': null,
                      'stroke-linejoin': null,
                      'stroke-width': 2.5,
                      fill: '#fff',
                    }}
                  />
                  <a href="javascript:;">
                    <rect
                      rx="5"
                      height="20"
                      width="20"
                      y={rectStartY + index * gap}
                      x="100"
                      onClick={event(node)}
                      stroke="#000"
                      style={{ 'stroke-opacity': null, 'stroke-width': 1.5, cursor: 'pointer' }}
                    />
                  </a>
                </g>
              );
            } else if (node.cluster_ip) {
              return (
                <g id={'svg5' + index}>
                  <title>{`[osd]`}</title>
                  <a href="javascript:;">
                    <rect
                      rx="5"
                      height="20"
                      width="20"
                      y={rectStartY + index * gap}
                      x="100"
                      onClick={event(node)}
                      stroke="#000"
                      style={{ 'stroke-opacity': null, 'stroke-width': 1.5, cursor: 'pointer' }}
                    />
                  </a>
                  <line
                    x1="120"
                    x2="180"
                    y1={clusterY + index * gap}
                    y2={clusterY + index * gap}
                    style={{
                      stroke: '#007f00',
                      'stroke-linecap': null,
                      'stroke-linejoin': null,
                      'stroke-width': 2.5,
                      fill: '#fff',
                    }}
                  />
                </g>
              );
            } else {
              return null;
            }
          })}
        </g>
      </svg>
    );
  }
}

export default SVG;
