

import {
    Form, Input, Icon, Button,Modal,
} from 'antd';
import { connect } from 'dva';
import styles from './chaincreate.css';
import React from 'react';
let id = 0;

class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            visible: false,
        }
    }

    showModal(){
      this.setState({
        visible: true,
      });
    }
  
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    createHandler(chainbody) {
        this.showModal()
        this.props.dispatch({
            type: 'chaincreate/create',
            payload: chainbody,
        });
    }

    getItemsValue = () => {    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const valus = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return valus;
    }

    handleCreate = () => {
        const peerprefix = "peer";
        var formvalue = this.props.form.getFieldsValue()
        var formvaluestr = JSON.stringify(this.props.form.getFieldsValue(), null, 2)
        var index = 0

        //装配区块链数据
        var postbody = {
            chainName: "",
            channelID: "",
            orgSet: [],
        }
        postbody.chainName = formvalue.chainname;
        postbody.channelID = formvalue.channelid;


        for (let values of formvalue.keys.values()) {
            console.log(values);
            var peerSet = [];
            var peersize = parseInt(formvalue.peerSize[values]);
            for (var peeri = 0; peeri < peersize; peeri++) {
                var peerobj = {
                    peerName: peerprefix + peeri,
                }
                peerSet.push(peerobj)
            }
            var orgobj = {
                org: formvalue.orgnames[values],
                orgIndex: index + 1,
                orgMspId: formvalue.orgMspIds[values],
                peerSet: peerSet
            }
            postbody.orgSet.push(orgobj)
            index++;
        }

        //装配完毕
        var formvaluestr = JSON.stringify(postbody, null, 2)
        console.log(formvaluestr);     //6、调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        this.createHandler(postbody);
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <div className={styles.org}>
                <Form.Item
                    {...formItemLayout}
                    label={'OrgName'}
                    required={false}
                >
                    {getFieldDecorator(`orgnames[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input org's name or delete this field.",
                        }],
                    })(
                        <Input placeholder="org name" style={{ width: '60%', marginRight: 8 }} />
                    )}
                    {
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.remove(k)}
                        />
                    }
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label={'orgMspId'}
                    required={false}
                >
                    {getFieldDecorator(`orgMspIds[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input orgMspId or delete this field.",
                        }],
                    })(
                        <Input placeholder="orgMspId" style={{ width: '60%', marginRight: 8 }} />
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label={'peerSize'}
                    required={false}
                >
                    {getFieldDecorator(`peerSize[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                        }],
                    })(
                        <Input type="number" placeholder="peerSize" style={{ width: '60%', marginRight: 8 }} />
                    )}
                </Form.Item>

                {/* <Form.Item
                {...formItemLayout }
                label={'userSize'}
                required={false}
            >
                {getFieldDecorator(`userSize[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Please input userSize or delete this field.",
                    }],
                })(
                    <Input placeholder="userSize" style={{ width: '60%', marginRight: 8 }} />
                )}
            </Form.Item> */}

            </div>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Item
                    {...formItemLayout}
                    label="Chain Name"
                >
                    {getFieldDecorator('chainname', {
                        rules: [{
                            required: true, message: 'Please input your Chain Name!',
                        }],
                    })(
                        <Input style={{ width: '60%', marginRight: 8 }} />
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="channelID"
                >
                    {getFieldDecorator('channelid', {
                        rules: [{
                            required: true, message: 'Please input your channelID!',
                        }],
                    })(
                        <Input style={{ width: '60%', marginRight: 8 }} />
                    )}
                </Form.Item>

                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add Org
                    </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.handleCreate}>Submit</Button>
                </Form.Item>
                <Modal
                    title="Block Chain ID"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                >
                    <p>{this.props.status}</p>
                </Modal>
            </Form>
        );
    }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);


function mapStateToProps(state) {
    const { status} = state.chaincreate;
    return {
        status
    };
}

//export default WrappedDynamicFieldSet;

export default connect(mapStateToProps)(WrappedDynamicFieldSet);