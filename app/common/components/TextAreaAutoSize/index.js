import React from "react";
import PropTypes from "prop-types";
import { propTypes as formPropTypes } from "redux-form";

import TextAreaControls from "common/components/TextAreaControls";
import { Block, Label, TextArea } from "./styles";

TextAreaAutoSize.propTypes = {
  ...formPropTypes.fieldPropTypes,
  label: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  showLabel: PropTypes.bool,
  showControls: PropTypes.bool,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
};

TextAreaAutoSize.defaultProps = {
  label: "",
  rows: 10,
  placeholder: "文章",
  minLength: 10,
  maxLength: 1000,
  showLabel: false,
  showControls: true,
  onReset: () => {},
  onSubmit: () => {},
  submitButtonText: "Submit",
};

function TextAreaAutoSize({
  input,
  meta,
  label,
  rows,
  placeholder,
  minLength,
  maxLength,
  showLabel,
  showControls,
  submitButtonText,
  onReset,
  onSubmit,
}) {
  return (
    <Block>
      <Label htmlFor={input.name} isHidden={!showLabel}>
        <span>{label || input.name}</span>
      </Label>
      <TextArea
        id={input.name}
        rows={rows}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        {...input}
      />
      {showControls &&
        meta.dirty && (
          <TextAreaControls
            maxLength={maxLength}
            textLength={input.value.length}
            onReset={onReset}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
          />
        )}
    </Block>
  );
}

export default TextAreaAutoSize;