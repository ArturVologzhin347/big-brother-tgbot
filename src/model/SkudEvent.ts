import Student from './Student';

interface SkudEvent {
    readonly id: number;
    readonly timestamp: number;
    readonly type: 'EXIT' | 'ENTER';
    readonly cardId: number;
    readonly student: Student | null;
}

export default SkudEvent;
