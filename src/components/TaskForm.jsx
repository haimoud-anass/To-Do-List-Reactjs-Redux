import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const filter = createFilterOptions();

const TaskForm = () => {
    const [taskText, setTaskText] = useState('');
    const [value, setValue] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue && typeof newValue === "object") {
            setTaskText(newValue.title);
        } else {
            setTaskText(newValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            dispatch(addTask(taskText));
            setTaskText('');
            setValue(null);
            navigate("/");
        }
    };

    return (
        <Stack direction="row" spacing={2}>
            <Autocomplete

                value={value}
                onChange={handleChange}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;

                    if (inputValue !== '' && !options.some((option) => inputValue === option.title)) {
                        filtered.push({ title: inputValue });
                    }

                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="task-autocomplete"
                options={tasks}
                getOptionLabel={(option) => option.title || ""}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Add a task"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        sx={{
                            width: 420,
                            borderRadius: '5px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme === 'darkMode' ? '#ffffff' : '#000000',
                                },
                                '&:hover fieldset': {
                                    borderColor: theme === 'darkMode' ? '#00aaff' : '#0056b3',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme === 'darkMode' ? '#00aaff' : '#0056b3',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: theme === 'darkMode' ? '#ffffff' : '#000000',
                            },
                            '& .MuiInputLabel-root': {
                                color: theme === 'darkMode' ? '#ffffff' : '#000000',
                            },
                        }}
                    />
                )}
            />

            <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={{
                    borderColor: theme === 'darkMode' ? '#ffffff' : '#000000',
                    color: theme === 'darkMode' ? '#ffffff' : '#000000',
                    '&:hover': {
                        borderColor: theme === 'darkMode' ? '#00aaff' : '#0056b3',
                        backgroundColor: theme === 'darkMode' ? '#00aaff22' : '#0056b322',
                    },
                }}
            >
                ADD
            </Button>
        </Stack>
    );
};
const tasks = [
    { title: "Wake up at 5:00 AM and pray Fajr at the mosque." },
    { title: "Recite morning Adhkar after Fajr prayer." },
    { title: "Read at least 5-10 verses from the Quran." },
    { title: "Avoid phone and social media for the first hour of the day." },
    { title: "Go for a short walk after Fajr for fresh air and mindfulness." },
    { title: "Plan your day and set goals before starting work/study." },
    { title: "Drink a glass of water and have a healthy breakfast." },
    { title: "Review the hadith of the day or Islamic lesson notes." },
    { title: "Write down three things you're grateful for in a journal." },
    { title: "Avoid unnecessary conversations and focus on morning tasks." },

    { title: "Spend 1 hour learning HTML & CSS basics." },
    { title: "Build a simple landing page as practice." },
    { title: "Learn JavaScript fundamentals (functions, loops, objects)." },
    { title: "Practice DOM manipulation by creating an interactive web page." },
    { title: "Create a simple to-do list using JavaScript." },
    { title: "Watch a tutorial on CSS Flexbox and practice it." },
    { title: "Start learning React.js by following an online course." },
    { title: "Work on a small project using Tailwind CSS." },
    { title: "Build a portfolio website showcasing your projects." },
    { title: "Learn how to deploy a website using GitHub Pages or Vercel." },


    { title: "Take a short break to refresh your mind." },
    { title: "Perform Dhuhr prayer on time, preferably at the mosque." },
    { title: "Have a healthy and light lunch to stay energized." },
    { title: "Recite some verses from the Quran or listen to Tafsir." },
    { title: "Spend 10 minutes reviewing an Islamic book or podcast." },
    { title: "Give sadaqah online or to someone in need." },
    { title: "Avoid excessive social media scrolling during the afternoon." },
    { title: "Practice mindful breathing or light stretching for relaxation." },
    { title: "Review your coding progress and take notes for improvement." },
    { title: "Set a goal for the second half of the day and focus on it." },


    { title: "Refactor a piece of code to make it more efficient." },
    { title: "Contribute to an open-source project or read others' code." },
    { title: "Write a blog post about what you learned today." },
    { title: "Experiment with a new JavaScript framework or library." },
    { title: "Work on debugging skills by solving common errors." },
    { title: "Practice API integration by fetching real-time data." },
    { title: "Try building a dark/light mode toggle feature." },
    { title: "Improve a past project by adding better UI/UX elements." },
    { title: "Build a personal Islamic app like a Tasbeeh counter." },
    { title: "Work on your problem-solving skills by solving coding challenges." },


    { title: "Pray Asr and make dua for productivity and success." },
    { title: "Spend some time with family or call loved ones." },
    { title: "Avoid excessive social media and focus on real interactions." },
    { title: "Read a book or article related to personal development." },
    { title: "Recite evening Adhkar and reflect on the day’s progress." },
    { title: "Perform Maghrib prayer and spend time in dhikr." },
    { title: "Attend an Islamic class, online lecture, or study a hadith." },
    { title: "Limit caffeine intake after Maghrib to ensure good sleep." },
    { title: "Prepare for the next day's schedule and plan tasks." },
    { title: "Relax and unwind with a non-screen activity (reading, journaling)." },


    { title: "Pray Isha on time and read Surah Mulk before sleeping." },
    { title: "Perform extra night prayers (Tahajjud) if possible." },
    { title: "Spend a few minutes in quiet reflection and gratitude." },
    { title: "Limit screen time 30 minutes before sleeping." },
    { title: "Make sincere dua for guidance and barakah in your work." },
    { title: "Set an intention for tomorrow’s goals before sleeping." },
    { title: "Get at least 6-8 hours of quality sleep." },
    { title: "Avoid unnecessary late-night distractions like gaming or TV." },
    { title: "Charge your phone away from your bed to avoid distractions." },
    { title: "Sleep on your right side following the Sunnah." },


    { title: "Memorize one new Surah or at least a few ayahs." },
    { title: "Learn one new hadith and apply it in daily life." },
    { title: "Give charity, even if it's a small amount online or in-person." },
    { title: "Attend Jumu'ah prayer early and listen to the khutbah attentively." },
    { title: "Visit an Islamic gathering or participate in a community event." },
    { title: "Fast on Mondays and Thursdays following the Sunnah." },
    { title: "Write down reflections on Islamic teachings and personal growth." },
    { title: "Review your coding progress for the week and set new goals." },
    { title: "Take a full break from screens for at least half a day." },
    { title: "Engage in self-care: exercise, healthy eating, and proper rest." },


    { title: "Read an Islamic book or Tafsir of a Surah." },
    { title: "Develop a new web project for your portfolio." },
    { title: "Join an online coding community or Islamic discussion forum." },
    { title: "Attend a local or online workshop to improve skills." },
    { title: "Make a personal improvement plan (spiritual + professional)." },
    { title: "Review financial spending and ensure halal earnings." },
    { title: "Complete a full-course tutorial on a new technology." },
    { title: "Engage in a 30-day Quran or Hadith challenge." },
    { title: "Evaluate your time management and productivity habits." },
    { title: "Plan a family gathering or community service activity." },


    { title: "Start the day with Bismillah and intention for productivity." },
    { title: "Use the Pomodoro technique (25 min work, 5 min break)." },
    { title: "Avoid multitasking – focus on one task at a time." },
    { title: "Keep a small Islamic notebook for ideas and reflections." },
    { title: "Say Alhamdulillah for every progress, even small ones." },
    { title: "Limit unnecessary notifications and distractions." },
    { title: "Use a task management app to stay organized." },
    { title: "Take handwritten notes for better retention of knowledge." },
    { title: "Review and optimize your daily habits for efficiency." },
    { title: "End the day with gratitude and istighfar before sleeping." }
];


//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={taskText}
//                 onChange={(e) => setTaskText(e.target.value)}
//                 placeholder="Add a new task"
//             />
//             <button type="submit">Add Task</button>
//         </form>
//     );
// };

export default TaskForm;