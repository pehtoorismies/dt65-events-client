import React, { Fragment, FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Helmet from 'react-helmet';
import BaseStep from './BaseStep';
import { RightArrowButton, LeftArrowButton } from '../../Common';
import { IEventStep } from '../../../types';

interface IProps extends IEventStep {
  description?: string;
  setDescription: (description: string) => void;
}

const modules = {
  toolbar: [
    [{ header: '1' }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const DescriptionStep: FunctionComponent<IProps> = (props: IProps) => {
  const { toPrevStep, toNextStep, setDescription, description } = props;

  const [editorState, setEditorState] = useState(description || '');

  const toNext = () => {
    setDescription(editorState);
    toNextStep();
  }

  const handleChange = (val: any) => {
    setEditorState(val);
  };

  return (
    <Fragment>
      <Helmet>
        <style>{`
          .ql-editor {
            min-height: 250px;
          }
          .ql-editor strong {
            font-weight:bold;
          }
          .ql-editor em {
            font-style: italic;
          }
          `}</style>
      </Helmet>

      <BaseStep title="Tarkempi kuvaus">
        <Box p={2}>
          <ReactQuill
            modules={modules}
            formats={formats}
            theme="snow"
            onChange={handleChange}
            value={editorState}
            placeholder="Anna tarkempi kuvaus..."
          />
        </Box>

        <Flex
          my={4}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <LeftArrowButton onClick={toPrevStep} visible={true} />
          <RightArrowButton onClick={toNext} visible={true} />
        </Flex>
      </BaseStep>
    </Fragment>
  );
};

export default DescriptionStep;
