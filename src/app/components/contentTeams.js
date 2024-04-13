"use client";
import { useState } from "react";
import { CardTeamPortrait, CardTeamHorizontal } from "../components/card";
import { ModalDialog } from "../components/modalDialog";

const ContentTeams = ({ children }) => {
  const firstTeam = children.find((item, index) => index === 0);

  const [isVisible, setIsVisible] = useState(false);

  const [dataDialog, setDataDialog] = useState(null);

  const clickAction = (item) => {
    setDataDialog(item);
    setIsVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleHide = () => {
    setIsVisible(false);
    document.body.style.overflow = "initial";
  };

  const generateContent = () => {
    return children.map((item, index) => {
      if (index !== 0) {
        return (
          <CardTeamPortrait
            key={index}
            avatar={item.leader.avatar}
            position={item.leader.position}
            name={item.leader.name}
            email={item.leader.email}
            clickAction={() => clickAction(item)}
          />
        );
      }
    });
  };

  return (
    <>
      <div className="bg-b20 w-full flex flex-col justify-center items-center py-1 sm:py-4 px-1 sm:px-4 gap-6">
        {firstTeam && (
          <>
            <div className="box-border xl:w-90 w-full flex items-center justify-center">
              <CardTeamHorizontal
                avatar={
                  firstTeam.leader.avatar.url
                }
                position={firstTeam.leader.position}
                name={firstTeam.leader.name}
                email={firstTeam.leader.email}
                clickAction={() => clickAction(firstTeam)}
              />
            </div>
            <div className="box-border xl:w-90 w-full flex flex-col sm:flex-row items-center justify-center gap-6">
              {generateContent()}
            </div>
          </>
        )}
      </div>
      {isVisible && (
        <ModalDialog
          title="Member Team"
          data={dataDialog}
          handleHide={() => handleHide()}
        />
      )}
    </>
  );
};

export default ContentTeams;
