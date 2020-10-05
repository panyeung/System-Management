import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/imgActions";
import { reqDeleteImg } from "../../../api";
import PropTypes from "prop-types";
import { BASE_IMG_URL } from "../../../utils/constants";
/**
 * Use for picture upload
 */
class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array,
  };

  constructor(props) {
    super();
    let fileList = [];

    console.log(props);
    //check if there is already imgs
    let imgs;
    // if (props.location.state) {
    //   imgs = props.location.state.imgs;
    //   console.log("yes Image", imgs);
    // } else {
    //   imgs = [];
    // }
    if (props.imgs.length > 0) {
      imgs = props.imgs;
      console.log("yes Image", imgs);
    } else {
      imgs = [];
    }
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img.name,
        status: "done", //picture status uploading, done, error, removed
        url: img.url,
        id: img.id,
      }));
    }
    //initialize state
    this.state = {
      previewVisible: false, //use to control preview
      previewImage: "", //Picture url
      fileList,
    };
  }
  /**
   * Hide modal
   */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    console.log("handlePreview", file);
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  /**
   * fileList is all the pictures that already upload
   * file- currently upload picture
   */
  handleChange = async ({ fileList, file }) => {
    console.log("handleChange", file.status, fileList);

    //once upload we can edit the info(name,url)
    if (file.status === "done") {
      const result = file.response; //{status:0, data:{name:"name.jpg",url}}
      if (result.status === 0) {
        message.success("Successfully Upload!!");
        const { name } = result.data;
        const { url, id } = result.data.url;
        console.log(result.data);
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
        file.id = id;
        this.props.setImgs(fileList);
      } else {
        message.error("Fail to upload");
      }
    } else if (file.status === "removed") {
      //delete image
      console.log(file);
      const response = await reqDeleteImg(file.id);
      console.log(response);
      let result = response.data;
      if (result.status === 0) {
        message.success("Delete image success!");
      } else {
        message.error("Delete image fail!");
      }
      this.props.setImgs(fileList);
    }

    //update the status
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" //up
          listType="picture-card"
          fileList={fileList} //Already upload picture array
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          accept="image/*" //only allow image
          name="image" //request param name
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imgs: state.imgs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setImgs: (imgs) => dispatch({ type: actionTypes.SET_IMG, imgs }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PicturesWall);
