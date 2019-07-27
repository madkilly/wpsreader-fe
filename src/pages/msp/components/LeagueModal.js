import {Component} from 'react'
import {Modal, Form, Input} from 'antd'

const FormItem = Form.Item;

class LeagueEditModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
        };
      }

      showModalHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
          visible: true,
        });
      };
    
      hideModelHandler = () => {
        this.setState({
          visible: false,
        });
      };
      
    
      okHandler = () => {
        const { onOk } = this.props;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            onOk(values);
            this.hideModelHandler();
          }
        });
      };
    
      render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, email, website } = this.props.record;
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
    
        return (
          <span>
            <span onClick={this.showModalHandler}>
              { children }
            </span>
            <Modal
              title="新建联盟"
              visible={this.state.visible}
              onOk={this.okHandler}
              onCancel={this.hideModelHandler}
            >
              <Form horizontal onSubmit={this.okHandler}>
                <FormItem
                  {...formItemLayout}
                  label="联盟名称"
                >
                  {
                    getFieldDecorator('name', {
                      initialValue: name,
                    })(<Input />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="成员限制"
                >
                  企业（实名认证）
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联盟描述"
                >
                  {
                    getFieldDecorator('website', {
                      initialValue: website,
                    })(<textarea />)
                  }
                </FormItem>
              </Form>
            </Modal>
          </span>
        );
      }  
}  
export default Form.create()(LeagueEditModal)