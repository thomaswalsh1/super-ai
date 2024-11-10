export let responses = $state({
    response1: "",
    response2: "",
    response3: "",
    response4: "",
});

export let evaluations = $state({
    evaluation: {
        "rankings": [
            {
                "llm_name": "LLM5",
                "score": 8.25
            },
            {
                "llm_name": "GPT-4",
                "score": 3.75
            },
            {
                "llm_name": "LLM4",
                "score": 5.5
            },
            {
                "llm_name": "LLM3",
                "score": 3.25
            },
            {
                "llm_name": "Claude",
                "score": 4.33
            }
        ],
        "reasoning": "hi",
        "evaluation_time": 66.513933,
        "criteria_scores": {
            "GPT-4": {
                "relevance": 0.0,
                "accuracy": 0.0,
                "coherence": 8.0,
                "completeness": 0.0
            },
            "Claude": {
                "relevance": 9.0,
                "accuracy": 0.0,
                "coherence": 7.0,
                "completeness": 2.0
            },
            "LLM3": {
                "relevance": 8.0,
                "accuracy": 0.0,
                "coherence": 6.0,
                "completeness": 4.0
            },
            "LLM4": {
                "relevance": 7.0,
                "accuracy": 0.0,
                "coherence": 5.0,
                "completeness": 6.0
            },
            "LLM5": {
                "relevance": 9.0,
                "accuracy": 9.0,
                "coherence": 8.0,
                "completeness": 9.0
            }
        }
    }
})
