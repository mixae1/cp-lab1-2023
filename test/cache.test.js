import {Cache} from "../src/cache.js";

test('New instance of the Cache should has size = 0', () => {
    const cache = new Cache()
    expect(cache.size()).toBe(0);
});

test('New instance of the Cache should be empty', () => {
    const cache = new Cache()
    expect(cache.empty()).toBeTruthy();
});

test('Nonexistent key must return null', () => {
    const  cache = new Cache()
    expect(cache.get("something")).toBe(null);
});

test('It should allow us setting a kv-pair', () => {
    const  cache = new Cache()
    cache.set(123, "123")
    expect(cache.get(123)).toBe("123");
});

test('It should allow us setting a kv-pair', () => {
    const  cache = new Cache()
    cache.set("123", "123")
    expect(cache.get("123")).toBe("123");
});

test('It should allow us setting any haha kv-pair', () => {
    const  cache = new Cache()
    cache.set([[],[]], "123")
    expect(cache.get(",")).toBe("123");
});

test('It should allow us setting any haha kv-pair', () => {
    const  cache = new Cache()
    cache.set({}, cache)
    expect(cache.get({})).toBe(cache);
});

test('It should return null if key`s appeals is zero', () => {
    const  cache = new Cache()
    cache.set({}, cache)
    cache.get({})
    expect(cache.get({})).toBe(null);
});

test('It should return size not counting max-appealed kv-pair (it should delete max-appealed kv-pairs)', () => {
    const  cache = new Cache()
    cache.set({}, cache)
    cache.set("1", 1)
    cache.get({})
    expect(cache.size()).toBe(1);
});

test('It should return false if cache is not empty', () => {
    const  cache = new Cache()
    cache.set({}, cache)
    expect(cache.empty()).toBeFalsy();
});

test('It should get number of appeals and count it down at getting', () => {
    const  cache = new Cache()
    cache.set({}, true, 3)
    expect(cache.get({})).toBeTruthy();
    expect(cache.get({})).toBeTruthy();
    expect(cache.get({})).toBeTruthy();
    expect(cache.get({})).toBe(null);
});

test('It should return false if cache is not empty', () => {
    const cache = new Cache()
    //cache.set({}, cache)
    cache.set("lol", 1, 2)
    cache.set("ge", 2)
    cache.set("123", 3, 10)
    expect(cache.get_stat()).toBe("{\"123\":{\"value\":3,\"appeals\":10},\"lol\":{\"value\":1,\"appeals\":2},\"ge\":{\"value\":2,\"appeals\":1}}");
});

test('It should get appeals only as integer', () => {
    const cache = new Cache()
    try {
        cache.set({}, {}, "not integer lol")
    } catch (e) {
        expect(e.message).toBe("Number of appeals should be integer value");
        return
    }
    expect(false).toBe(true);
});

test('It should set null value for default', () => {
    const  cache = new Cache()
    cache.set({})
    expect(cache.size()).toBe(1);
    expect(cache.get({})).toBe(null);
});