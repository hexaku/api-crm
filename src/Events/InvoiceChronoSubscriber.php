<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event)
    {
        $method = $event->getRequest()->getMethod();
        $invoice = $event->getControllerResult();

        if($invoice instanceof Invoice && $method === "POST"){
            $nextChrono = $this->repository->findLastChrono($this->security->getUser());
            $invoice->setChrono($nextChrono+1);
        }

        if(empty($invoice->getSentAt())){
            $invoice->setSentAt(new \DateTime());
        }
    }
}