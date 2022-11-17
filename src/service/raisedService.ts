import axios from '../config/axios';

const botHasBeenRaised = async function (): Promise<void> {
    await axios.post('/buffer');
};

export { botHasBeenRaised };
