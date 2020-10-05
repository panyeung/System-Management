import React, { forwardRef, useImperativeHandle, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
//import htmlToDraft from "html-to-draftjs";

const RichTextEditor = forwardRef((props, ref) => {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());

  /**
   * Listen for the editor change
   * update the state
   */
  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
  };

  useImperativeHandle(ref, () => ({
    getDetail() {
      //text to html
      return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    },
  }));

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/manage/img/upload");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const url = response.data.url; //get image url
        resolve({ data: { link: url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  return (
    <Editor
      editorState={editorState}
      editorStyle={{
        border: "1px solid black",
        minHeight: 200,
        paddingLeft: 10,
      }}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
        },
      }}
    />
  );
});

export default RichTextEditor;
