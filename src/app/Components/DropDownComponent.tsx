"use client";

import { IDropDownState } from "@/Interfaces/Interfaces";


export function DropDownComponent(props: IDropDownState) {
    return (
        <select defaultValue={props.passUse}  onChange={(e)=>props.passUseState(e.target.value)} className="rounded-[10px]">
            <option value="" className="text-[24px]">Select An Option</option>
            <option value="Clueless" className="text-[24px]">Clueless (Know nothing about job interviews)</option>
            <option value="Beginner" className="text-[24px]">Beginner (Know a little about job interviews)</option>
            <option value="Intermediate" className="text-[24px]">Intermediate (Had a few job interviews, but need more practice)</option>
            <option value="Advanced" className="text-[24px]">Advanced (Pretty good at job interviews)</option>
            <option value="Champ" className="text-[24px]">Champ (Eat job interview questions for breakfast!)</option>
        </select>
    );
}