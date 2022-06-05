<?php

namespace App\Http\Traits;

use App\Events\MessageRead;
use App\Http\Resources\MessageResource;
use App\Models\Message;

trait MessageTrait
{
    public function messageSetTelahDibaca($to_user)
    {
        $messagesNotRead = Message::whereTo(user('id'))->where("status", "!=", config("chats.chat.DIBACA"))->get();
        $ids =   $messagesNotRead->map(function ($messageNotRead, $key) {
            $messageNotRead->status = config("chats.chat.DIBACA");
            MessageRead::dispatch($messageNotRead);
            return $messageNotRead->id;
        });

        if ($ids->count() > 0)
            Message::whereIn("id", $ids->all())->update(["status" => config("chats.chat.DIBACA")]);
    }
}
