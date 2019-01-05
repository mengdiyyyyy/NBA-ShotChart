import React from 'react';
import _ from 'lodash';
import { Row, Col, Radio, Switch } from 'antd';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,
    }

    onMinCountChange = (minCount) => {
        console.log('minCount: ' + minCount);
        this.setState({ minCount });
    }

    onChartTypeChange = (e) => {
        this.setState({ chartType: e.target.value });
    }

    onTooltipChange = (displayTooltip) => {
        this.setState({ displayTooltip});
    }

    render() {
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayTooltip={this.state.displayTooltip}
                />

                <div className="filters">
                    {this.state.chartType === 'hexbin' ? (<Row className="filter-row">
                        <Col span={2} offset={3} className="filter-label">Shots:</Col>
                        <Col span={16}>
                            <CountSlider className="filter-control" onMinCountChange={_.debounce(this.onMinCountChange, 500)}/>
                        </Col>
                    </Row>) : null}

                    <Row className="filter-row">
                        <Col span={10} offset={3}>
                            <RadioGroup className="filter-control" onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={2} className="filter-label">Tooltip:</Col>
                        <Col span={3} className="filter-label">
                            <Switch checkedChildren="on" unCheckedChildren="off" defaultChecked onChange={this.onTooltipChange}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}