type TaskType = {
    id?: string
    description?: string
    isDone?: boolean
    isEditing?: boolean
    hexColorPos?: number

}

export const colorsItems = [
    //Deep, Light
    //Purple red
    ["#9901ff8e", "#9900ff"],
    ["#a80404", "#ff0000"],
    ["#b15f02", "#ff8800"],
    ["#0162ff", "#0046b6"],
    ["#aa02a1", "#ff00f2"],
    ["##17c300", "#1eff00"],
]


class Task {

    readonly id: string
    readonly description: string
    readonly isDone: boolean
    readonly isEditing: boolean
    readonly hexColorPos: number
    //Stores the number in the array
    //This values is initialized when the values is going to render

    constructor(id: string, description: string, isDone = false, isEditing = false) {
        this.id = id
        this.description = description
        this.isDone = isDone
        this.isEditing = isEditing
        this.hexColorPos = this.getColorPosition()
    }

    //id?: string, description?: string, isDone?: boolean
    public copyWith({ id, description, isDone, isEditing }: TaskType): Task {
        return new Task(id ?? this.id, description ?? this.description, isDone ?? this.isDone, isEditing ?? this.isEditing)
    }



    //Generates a ramdom number
    public getColorPosition(exeption?: number): number {

        const min = Math.ceil(0);
        //The last position generates an error
        const max = Math.floor(colorsItems.length - 1)

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

        if (!exeption) return randomNumber

        if (randomNumber === exeption)
            return this.getColorPosition(exeption)

        return randomNumber

    }
}

export default Task