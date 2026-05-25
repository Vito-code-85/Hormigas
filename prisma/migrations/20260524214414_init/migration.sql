-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushSubscription" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Score_score_idx" ON "Score"("score");

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");
