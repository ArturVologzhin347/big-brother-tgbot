import axios from '../config/axios';

const botHasBeenRaised = async function (): Promise<void> {
    return await axios.post('/buffer');
};

export { botHasBeenRaised };
