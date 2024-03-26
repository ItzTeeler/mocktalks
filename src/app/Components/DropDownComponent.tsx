"use client";


export function DropDownComponent() {
    return (
        <select className="rounded-[10px]">
            <option>Clueless <span className="text-[24px]">(Know nothing about job interviews)</span></option>
            <option>Beginner <span className="text-[24px]">(Know a little about job interviews)</span></option>
            <option>Intermediate <span className="text-[24px]">(Had a few job interviews, but need more practice)</span></option>
            <option>Advanced <span className="text-[24px]">(Pretty good at job interviews)</span></option>
            <option>Champ <span className="text-[24px]">(Eat job interview questions for breakfast!)</span></option>
        </select>
    );
}
