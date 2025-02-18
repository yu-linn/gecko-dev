/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_ipc_Faulty_h
#define mozilla_ipc_Faulty_h

#include <set>
#include <string>
#include <vector>
#include "base/string16.h"
#include "nsDebug.h"
#include "nsTArray.h"

#define FAULTY_DEFAULT_PROBABILITY 1000
#define FAULTY_DEFAULT_MUTATION_FACTOR 10
#define FAULTY_LOG(fmt, args...) \
  if (mozilla::ipc::Faulty::IsLoggingEnabled()) { \
    printf_stderr("[Faulty] (%10u) " fmt "\n", getpid(), ## args); \
  }

namespace IPC {
  // Needed for blacklisting messages.
  class Message;
}

namespace mozilla {
namespace ipc {

class Faulty
{
  public:
    // Used as a default argument for the Fuzz|datatype| methods.
    static const unsigned int sDefaultProbability;

    static unsigned int DefaultProbability(void);
    static bool Logging(void);
    static bool IsLoggingEnabled(void) { return sIsLoggingEnabled; }
    static std::vector<uint8_t> GetDataFromIPCMessage(IPC::Message* aMsg);
    static nsresult CreateOutputDirectory(const char *aPathname);
    static nsresult ReadFile(const char* aPathname, nsTArray<nsCString> &aArray);
    static void CopyFDs(IPC::Message* aDstMsg, IPC::Message* aSrcMsg);

    static Faulty& instance();

    // Fuzzing methods for Pickle.
    void FuzzBool(bool* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzChar(char* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzUChar(unsigned char* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzInt16(int16_t* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzUInt16(uint16_t* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzInt(int* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzUInt32(uint32_t* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzLong(long* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzULong(unsigned long* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzInt64(int64_t* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzUInt64(uint64_t* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzSize(size_t* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzFloat(float* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzDouble(double* aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzString(std::string& aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzWString(std::wstring& aValue, unsigned int aProbability=sDefaultProbability);
    void FuzzBytes(void* aData, int aLength, unsigned int aProbability=sDefaultProbability);

    // Fuzzing methods for pipe fuzzing.
    void MaybeCollectAndClosePipe(int aPipe, unsigned int aProbability=sDefaultProbability);

    // Fuzzing methods for message blob fuzzing.
    void DumpMessage(const char *aChannel, IPC::Message* aMsg, std::string aAppendix=nullptr);
    bool IsMessageNameBlacklisted(const char* aMessageName);
    IPC::Message* MutateIPCMessage(const char *aChannel, IPC::Message* aMsg,
      unsigned int aProbability=sDefaultProbability);

    void LogMessage(const char* aChannel, IPC::Message* aMsg);

  private:
    std::set<int> mFds;

    const bool mFuzzMessages;
    const bool mFuzzPipes;
    const bool mFuzzPickle;
    const bool mUseLargeValues;
    const bool mUseAsWhitelist;
    const bool mIsValidProcessType;

    const char* mMessagePath;
    const char* mBlacklistPath;

    size_t sMsgCounter;

    static const bool sIsLoggingEnabled;

    Faulty();
    DISALLOW_EVIL_CONSTRUCTORS(Faulty);

    static bool IsValidProcessType(void);
    static uint32_t MutationFactor();

    // Fuzzing methods for Pickle
    void MutateBool(bool* aValue);
    void MutateChar(char* aValue);
    void MutateUChar(unsigned char* aValue);
    void MutateInt16(int16_t* aValue);
    void MutateUInt16(uint16_t* aValue);
    void MutateInt(int* aValue);
    void MutateUInt32(uint32_t* aValue);
    void MutateLong(long* aValue);
    void MutateULong(unsigned long* aValue);
    void MutateInt64(int64_t* aValue);
    void MutateUInt64(uint64_t* aValue);
    void MutateSize(size_t* aValue);
    void MutateFloat(float* aValue);
    void MutateDouble(double* aValue);
};

} // namespace ipc
} // namespace mozilla

#endif

