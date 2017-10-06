import React, { Component } from 'react'
import Stars from './rate-stars/Stars'

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: [],
            deviceShow: [],
            direction: 1,
        };
        this.handleDeviceChange = this.handleDeviceChange.bind(this);
    }


    componentDidMount(){
        this.setState({
            catalog: this.props.catalog
        })
    }


    updateData(newData) {
        this.setState(newData);
    }

    //Checkbox data
    handleDeviceChange(e) {
        const deviceShow = this.state.deviceShow;
        let index;
        if (e.target.checked) {
            deviceShow.push(e.target.name)
        }
        else {
            index = deviceShow.indexOf(e.target.name);
            deviceShow.splice(index, 1)
        }
        this.setState({
            deviceShow
        });
    }


    render() {
        if (!this.props.catalog) {
            return (
                <p>Loading...</p>
            );
        }
        return (
            <div className="all-info">
                <form>
                    <p><label>
                        <input name="laptop" type="checkbox" checked={this.props.deviceName} onChange={this.handleDeviceChange}/>
                        Laptops</label>
                    </p>
                    <p><label>
                        <input name="tablet" type="checkbox" checked={this.props.deviceName} onChange={this.handleDeviceChange}/>
                        Tablets</label>
                    </p>
                    <p><label>
                        <input name="phone" type="checkbox" checked={this.props.deviceName} onChange={this.handleDeviceChange}/>
                        Mobile phones</label>
                    </p>
                </form>
                <CatalogList
                    update={this.updateData.bind(this)}
                    onVote={this.handleProductUpVote}
                    catalog={this.state.catalog}
                    deviceShow={this.state.deviceShow}
                    direction={this.state.direction}
                />
            </div>
        );
    }
}


class DeviceRow extends Component {
    render() {
        const catalog = this.props.catalog;
        return (
            <div className="t-row">
                <span className="item-choice"><input type="checkbox" /></span>
                <span className="item item-name">{catalog.name}</span>
                <span className="item item-rating">
            <Stars rating={catalog.rating}/>
          </span><span className="item item-price">{catalog.price}</span>
            </div>
        );
    }
}



class CatalogList extends Component {

    constructor(props) {
        super(props);
        this.sorted = {
            name: true,
            rating: true,
            price: true
        };
        this.sort = this.sort.bind(this);
    }


    sort(type) {
        const { update, catalog} = this.props;
        const isSorted = this.sorted[type];
        let direction = isSorted ? 1 : -1;
        const sorted = [].slice.call(catalog).sort((a, b) => {
            if (a[type] === b[type]) {
                return 0;
            }
            return a[type] > b[type] ? direction : direction * -1;
        });
        this.sorted[type] = !isSorted;
        update({
            catalog: sorted,
            direction: direction,
        });
    }


    render() {
        const deviceShow = this.props.deviceShow;
        const content = [];
        if( deviceShow.length !== 0){
            this.props.catalog.map((catalog) => {
                const deviceRow = (
                    <DeviceRow catalog={catalog} key={catalog.id}/>
                );
                let phone  = deviceShow.indexOf('phone');
                let tablet  = deviceShow.indexOf('tablet');
                let laptop  = deviceShow.indexOf('laptop');

                if (laptop !== -1 && catalog.type === 'laptop'){
                    content.push(deviceRow);
                }
                if (phone !== -1 && catalog.type === 'phone'){
                    content.push(deviceRow);
                }
                if (tablet !== -1 && catalog.type === 'tablet'){
                    content.push(deviceRow);
                }
                return content
            });
        }
        else {
            this.props.catalog.map((catalog) => {
                content.push(<DeviceRow catalog={catalog} key={catalog.id}/>);
                return content
            });
        }
        return (
            <div className="item-content">
                <div className="item-content__title">
                    <div className="item-choice">-</div>
                    <div onClick={() => this.sort('name')}
                          className="top-title item item-name"><span>Product name</span></div>
                    <div onClick={() => this.sort('rating')}
                          className="top-title item item-rating"><span>Rating</span></div>
                    <div onClick={() => this.sort('price')}
                          className="top-title item item-price"><span>Price</span></div>
                </div>
                <div className="t-rows">{content}</div>
            </div>
        );
    }
}




export default Catalog;
