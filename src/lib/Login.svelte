<script lang="ts">
    import { currentUser, pb } from "./pocketbase";
    import Messeges from "./Messeges.svelte";
    let username: string;
    let password: string;

    async function login() {
        await pb.collection("users").authWithPassword(username, password);
    }

    async function signup() {
        try {
            const data = {
                username,
                password,
                passwordConfirm: password,
                name: "test!",
            };

            const createdUser = await pb.collection("users").create(data);
            await login();
        } catch (err) {
            console.log(err);
        }
    }

    function signout() {
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
    <p>Signed in as {$currentUser.username}</p>
    <Messeges />
{:else}
    <form on:submit|preventDefault>
        <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            bind:value={username}
        />
        <input
            type="password"
            name="password"
            id="password"
            bind:value={password}
        />
        <button on:click={signup}>Sign Up</button>
        <button on:click={login}>Login</button>
    </form>
{/if}
