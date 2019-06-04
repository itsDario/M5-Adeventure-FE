export default function userReducer(
    state = {
        userName: '',
        items: [],
    },
    action
) {
    switch (action.type) {
        case 'INCREASE_COUNT':
            return { ...state, items: [...state.items, 1] };
        case 'LOGIN':
            fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: 'bario',
                        password: 'a'
                    }
                })
            })
                .then(r => r.json())
                .then(r => console.log('appLog', r))
            return state;
        case 'LOGOUT':
            return state;
        default:

            return state;
    }
}