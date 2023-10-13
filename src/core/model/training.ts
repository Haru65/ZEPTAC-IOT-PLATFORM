
interface ITraining {
    id: number;
    training_date: string;
    training_topic: string;
    trainers: string;
    training_mode: string;
    training_status: string;
}  
export type { ITraining };

export const TrainingMode = [
    {
        id: 1,
        mode: "Remote",
    },
    {
        id: 2,
        mode: "In-Center",
    },
];

export const TrainingStatus = [
    {
        id: 1,
        status: "Yet To Start",
    },
    {
        id: 2,
        status: "In Progress",
    },
    {
        id: 3,
        status: "Completed",
    }
];

export const GetTrainingStatus = (id) => {
    const status = TrainingStatus.find(item => item.id == id);
    return status ? status.status : "";
};

export const GetTrainingMode = (id) => {
    const mode = TrainingMode.find(item => item.id == id);
    return mode ? mode.mode : "";
};