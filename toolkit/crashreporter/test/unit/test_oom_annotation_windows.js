function run_test() {
  if (!("@mozilla.org/toolkit/crash-reporter;1" in Cc)) {
    dump("INFO | test_crash_oom.js | Can't test crashreporter in a non-libxul build.\n");
    return;
  }

  do_crash(
    function() {
      crashType = CrashTestUtils.CRASH_OOM;
      crashReporter.annotateCrashReport("TestKey", "Yes");
    },
    function(mdump, extra) {
      Assert.equal(extra.TestKey, "Yes");
      Assert.ok("OOMAllocationSize" in extra);
      Assert.ok(Number(extra.OOMAllocationSize) > 0);
      Assert.ok("SystemMemoryUsePercentage" in extra);
      Assert.ok("TotalVirtualMemory" in extra);
      Assert.ok("AvailableVirtualMemory" in extra);
      Assert.ok("TotalPageFile" in extra);
      Assert.ok("AvailablePageFile" in extra);
      Assert.ok("TotalPhysicalMemory" in extra);
      Assert.ok("AvailablePhysicalMemory" in extra);

    },
    true);
}
