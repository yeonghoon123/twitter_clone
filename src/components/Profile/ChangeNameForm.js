import React, { useState } from "react";

const ChangeNameForm = ({ userinfoObj, refreshUserinfo}) => {
    const [editStatus, setEditStatus] = useState(false);
    const [updateName, setUpdateName] = useState("");

    const onChangeName = (event) => {
        setUpdateName(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (updateName !== userinfoObj.displayName) {
            await userinfoObj.updateProfile({
                displayName: updateName,
            });
        }

        refreshUserinfo();
        setEditStatus(false);
    };
    return(
        <div>
        {editStatus ? (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="change name"
                    onChange={onChangeName}
                    value={updateName}
                />
                <input type="submit" value="update" />
                <button onClick={() => setEditStatus(false)}>
                    cancel
                </button>
            </form>
        ) : (
            <button onClick={() => setEditStatus(true)}>
                Change Name
            </button>
        )}
    </div>
    )
}

export default ChangeNameForm;