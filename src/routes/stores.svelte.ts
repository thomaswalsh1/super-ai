export let responses = $state({
    response1: "",
    response2: "",
    response3: "",
    response4: "",
});

export let evaluations = $state({
    evaluation: {
        "rankings": [],
    },
});

export let evaluating = $state({
    is: false,
});
