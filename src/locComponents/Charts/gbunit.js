import React from 'react';
import numeral from 'numeral';

const gbunit = val => `${numeral(val * Math.pow(2, 30)).format('0.00ib')}`;
/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class GBunit extends React.PureComponent {
  componentDidMount() {
    this.rendertoHtml();
  }

  componentDidUpdate() {
    this.rendertoHtml();
  }

  rendertoHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = gbunit(children);
    }
  };

  render() {
    return (
      <span ref={ref => {
        this.main = ref;
      }} />
    );
  }
}
