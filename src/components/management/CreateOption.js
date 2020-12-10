import tw, { styled } from "twin.macro";
import React, { useRef } from "react";

// components
import { TextInput } from "../Inputs";

const CreateOptions = ({ options, setOptions }) => {
  const ref = useRef();

  const createOption = () => {
    const state = { ...options };
    state.data.push(ref.current.value);
    setOptions(state);
    ref.current.value = "";
  };

  const deleteOption = (index) => {
    const state = { ...options };
    state.data.splice(index, 1);
    setOptions(state);
  };

  return (
    <CreateOptions.Container>
      <ul>
        {options.data.map((option, index) => {
          return (
            <li onClick={() => deleteOption(index)} key={option}>
              {option}
            </li>
          );
        })}
      </ul>
      <div className="actions">
        <TextInput
          ref={ref}
          type="text"
          name="create-option"
          placeholder="Enter an option"
          id={`create-option-${Date.now()}`}
        />
        <div role="button" onClick={createOption}>
          Add Option
        </div>
      </div>
    </CreateOptions.Container>
  );
};

CreateOptions.Container = styled.div`
  ${tw`flex flex-wrap`}
  .actions {
    ${tw`w-full`}

    [role="button"] {
      ${tw`p-2 my-2 bg-gray-300 text-center text-sm font-bold w-full`}
    }
  }

  ul {
    ${tw`w-full flex flex-wrap`}
    li {
      ${tw`cursor-pointer p-2 my-2 mr-2 bg-orange-200 rounded relative`}
    }
  }
`;

export default CreateOptions;
