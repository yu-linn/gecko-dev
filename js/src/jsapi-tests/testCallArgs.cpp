/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "js/CompilationAndEvaluation.h"
#include "jsapi-tests/tests.h"

static bool
CustomNative(JSContext* cx, unsigned argc, JS::Value* vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);

    MOZ_RELEASE_ASSERT(!JS_IsExceptionPending(cx));

    MOZ_RELEASE_ASSERT(!args.isConstructing());
    args.rval().setUndefined();
    MOZ_RELEASE_ASSERT(!args.isConstructing());

    return true;
}

BEGIN_TEST(testCallArgs_isConstructing_native)
{
    CHECK(JS_DefineFunction(cx, global, "customNative", CustomNative, 0, 0));

    JS::CompileOptions opts(cx);
    opts.setFileAndLine(__FILE__, __LINE__ + 4);

    JS::RootedValue result(cx);
    static const char code[] = "new customNative();";
    CHECK(!JS::EvaluateUtf8(cx, opts, code, strlen(code), &result));

    CHECK(JS_IsExceptionPending(cx));
    JS_ClearPendingException(cx);

    EVAL("customNative();", &result);
    CHECK(result.isUndefined());

    return true;
}
END_TEST(testCallArgs_isConstructing_native)

static bool
CustomConstructor(JSContext* cx, unsigned argc, JS::Value* vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);

    MOZ_RELEASE_ASSERT(!JS_IsExceptionPending(cx));

    if (args.isConstructing()) {
        JSObject* obj = JS_NewPlainObject(cx);
        if (!obj) {
            return false;
        }

        args.rval().setObject(*obj);

        MOZ_RELEASE_ASSERT(args.isConstructing());
    } else {
        args.rval().setUndefined();

        MOZ_RELEASE_ASSERT(!args.isConstructing());
    }

    return true;
}

BEGIN_TEST(testCallArgs_isConstructing_constructor)
{
    CHECK(JS_DefineFunction(cx, global, "customConstructor", CustomConstructor, 0,
                            JSFUN_CONSTRUCTOR));

    JS::RootedValue result(cx);

    EVAL("new customConstructor();", &result);
    CHECK(result.isObject());

    EVAL("customConstructor();", &result);
    CHECK(result.isUndefined());

    return true;
}
END_TEST(testCallArgs_isConstructing_constructor)
