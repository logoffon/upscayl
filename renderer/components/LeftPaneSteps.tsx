import React from "react";
import Select from "react-select";
import ReactTooltip from "react-tooltip";

function LeftPaneSteps(props) {
  const handleBatchMode = () => {
    props.setBatchMode((oldValue) => !oldValue);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const modelOptions = [
    { label: "General Photo", value: "realesrgan-x4plus" },
    { label: "Digital Art", value: "realesrgan-x4plus-anime" },
    { label: "Sharpen Image", value: "models-DF2K" },
  ];

  return (
    <div className="animate-step-in animate flex h-screen flex-col gap-7 overflow-auto rounded-r-lg p-5">
      {/* BATCH OPTION */}
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          className="checkbox"
          onClick={handleBatchMode}
        ></input>
        <p
          className="mr-1 inline-block cursor-help text-sm"
          data-tip="This will let you upscale all files in a folder at once"
        >
          Batch Upscale
        </p>
      </div>

      {/* ADVANCED OPTION */}
      <div className="flex flex-row items-center gap-2">
        <input type="checkbox" className="checkbox" onClick={handleBatchMode} />
        <p
          className="mr-1 inline-block cursor-help text-sm"
          data-tip="This will let you upscale all files in a folder at once"
        >
          Advanced Options
        </p>
      </div>

      {/* STEP 1 */}
      <div data-tip={props.imagePath}>
        <p className="step-heading">Step 1</p>
        <button
          className="btn-primary btn"
          onClick={
            !props.batchMode
              ? props.selectImageHandler
              : props.selectFolderHandler
          }
        >
          Select {props.batchMode ? "Folder" : "Image"}
        </button>
      </div>

      {/* STEP 2 */}
      <div className="animate-step-in">
        <p className="step-heading">Step 2</p>
        <p className="mb-2 text-sm">Select Upscaling Type</p>

        <Select
          options={modelOptions}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
          }}
          onChange={props.handleModelChange}
          className="react-select-container"
          classNamePrefix="react-select"
          defaultValue={modelOptions[0]}
          defaultMenuIsOpen={true}
        />

        {props.model !== "models-DF2K" && !props.batchMode && (
          <div className="mt-2 flex items-center gap-1">
            <input
              type="checkbox"
              className="checkbox"
              checked={props.doubleUpscayl}
              onChange={(e) => {
                if (e.target.checked) {
                  props.setDoubleUpscayl(true);
                } else {
                  props.setDoubleUpscayl(false);
                }
              }}
            />
            <p
              className="cursor-pointer text-sm"
              onClick={(e) => {
                props.setDoubleUpscayl(!props.doubleUpscayl);
              }}
            >
              Double Upscayl
            </p>
            <span
              className="badge-info badge cursor-help"
              data-tip="Enable this option to get an 8x upscayl. Note that this may not always work properly with all images, for example, images with really large resolutions."
            >
              i
            </span>
          </div>
        )}
      </div>

      {/* STEP 3 */}
      <div className="animate-step-in" data-tip={props.outputPath}>
        <p className="step-heading">Step 3</p>
        <p className="mb-2 text-sm">Defaults to Image's path</p>
        <button className="btn-primary btn" onClick={props.outputHandler}>
          Set Output Folder
        </button>
      </div>

      {/* STEP 4 */}
      <div className="animate-step-in">
        <p className="step-heading">Step 4</p>
        <button
          className="btn-accent btn"
          onClick={props.upscaylHandler}
          disabled={props.progress.length > 0}
        >
          {props.progress.length > 0 ? "Upscayling⏳" : "Upscayl"}
        </button>
      </div>

      <ReactTooltip
        className="bg-neutral-900 text-neutral-50 max-w-md break-words"
        place="top"
      />
    </div>
  );
}

export default LeftPaneSteps;
