"use client";


export function DropDownComponent() {
    return (
        <select className="rounded-[10px]">
            <option className="text-[24px]">Clueless (Know nothing about job interviews)</option>
            <option className="text-[24px]">Beginner (Know a little about job interviews)</option>
            <option className="text-[24px]">Intermediate (Had a few job interviews, but need more practice)</option>
            <option className="text-[24px]">Advanced (Pretty good at job interviews)</option>
            <option className="text-[24px]">Champ (Eat job interview questions for breakfast!)</option>
        </select>
    );
}
